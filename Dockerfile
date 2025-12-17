# syntax=docker/dockerfile:1

# ==========================================
# Stage 1: Dependencies
# ==========================================
FROM oven/bun:1-alpine AS deps

WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install --frozen-lockfile

# ==========================================
# Stage 2: Builder
# ==========================================
FROM oven/bun:1-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set Next.js to output standalone for production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the application using Bun
RUN bun run build

# ==========================================
# Stage 3: Runner (Production)
# ==========================================
FROM oven/bun:1-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Set up standalone output directory
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application using Bun
CMD ["bun", "run", "server.js"]
