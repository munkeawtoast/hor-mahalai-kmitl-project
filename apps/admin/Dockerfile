#######################
FROM node:alpine AS builder

# Set required packages
RUN apk add --no-cache libc6-compat
RUN apk update
RUN yarn global add pnpm turbo
# Set working directory
WORKDIR /app
COPY . .
RUN turbo prune --scope=webadmin --docker
 
#######################
FROM builder AS installer
 
WORKDIR /app
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install
 
# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm turbo run build --filter=webadmin...

####################### 
FROM installer AS runner

WORKDIR /app/apps/admin
CMD ["pnpm", "run", "preview"]