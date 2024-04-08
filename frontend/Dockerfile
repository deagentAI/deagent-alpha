FROM node:20


# Set the working directory inside the container
WORKDIR /app

# Copy the entire project into the container
COPY . .

# If you need to set a specific registry, you can do so with the next line:
# RUN yarn config set registry https://registry.npm.taobao.org/

# Install dependencies using yarn
RUN npm i -g pnpm

# Add sharp to the project
#RUN yarn add sharp

# Set NODE_ENV to production for building
ENV NODE_ENV=production

RUN pnpm i
# Build the project with rust backtrace enabled
RUN RUST_BACKTRACE=1 pnpm run build:uat

# Remove src and node_modules directories after build to reduce image size
#RUN rm -rf src node_modules

# Specify the command to run when the container starts
CMD ["pnpm", "run", "start:uat"]
