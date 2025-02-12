# Rankine Cycle Calculator

A React-based application to calculate and visualize the Simple Rankine Cycle thermodynamic process.

![Demo Screenshot](./public/Screenshot%202025-02-12%20232107.png)

## Features

- Select condenser parameters using **temperature** or **pressure**
- Configure boiler pressure and temperature
- Fetch thermodynamic data from JSON datasets
- Display calculated properties (enthalpy, entropy, etc.)
- Visualize the Rankine Cycle process with an interactive diagram
- Clear results and reset inputs

## Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Condenser Configuration**

   - Select either Temperature or Pressure
   - Choose a value from the dropdown (populated from dataset)

2. **Boiler Configuration**

   - Select boiler pressure (MPa)
   - Choose boiler temperature (°C) based on selected pressure

3. **Calculate**

   - Click "Show properties" to view thermodynamic properties
   - Results include:
     - Cycle efficiency
     - Turbine work
     - Heat input/output
     - Pump work

4. **Visualization**
   - Interactive Rankine Cycle diagram showing process states

## Data Sources

The application uses thermodynamic data from:

- `compressed_liquid_and_superheated_steam_V1.3.json`
- `saturated_by_pressure_V1.4.json`
- `saturated_by_temperature.json`

Data files should be placed in the `/public` directory.

## Dependencies

- React
- @xyflow/react (for diagram visualization)
- react-icons
- uuid (for unique keys)
- Vite (build tool)

## Component Structure

- **App**: Main component handling state and calculations
- **DataList**: Renders dropdown options from JSON data
- **RankineCycleDiagram**: Visualizes the cycle process
- **Properties**: Displays thermodynamic properties
- **Result**: Shows calculation results

## Contributing

Contributions are welcome! Potential improvements:

- Add more thermodynamic data points
- Implement unit conversion
- Enhance error handling
- Improve diagram interactivity
- Add additional cycle configurations
