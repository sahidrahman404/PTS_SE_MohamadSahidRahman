# PTS_SE_MohamadSahidRahman

## Requirements

Before running the project, ensure you have the following installed:
- **Node.js** (version 20.x or higher)
- **Yarn** (version 4.5.0 or higher)

## Installation

1. Clone the repository.
2. Navigate to the project folder and install dependencies by running:

   ```bash
   yarn install
   ```

## Available Scripts

The project includes several scripts to help with development, testing, linting, and building.

### 1. **Development**
To start the development environment with TypeScript and Node.js in watch mode, run:

```bash
yarn dev
```

### 2. **Testing**
To run unit tests using Vitest:

```bash
yarn test
```

### 3. **Linting**
To check for TypeScript errors, run:

```bash
yarn lint
```

### 4. **Building**
To create a production build:

```bash
yarn build
```

This bundles the project using esbuild and outputs the compiled code to the `dist` folder.

### 5. **Starting the Production Build**
After creating the build, you can run it with:

```bash
yarn start
```

This runs the compiled code located in the `dist` directory using Node.js.