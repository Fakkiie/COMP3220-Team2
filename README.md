**Project Setup
Prerequisites**
Make sure you have the following installed on your machine:
Python 3.x
Node.js (which includes npm)

**Setup Instructions**

1. Clone the Repository
  First, clone the project to your local machine:
  Run git clone https://github.com/Fakkiie/COMP3220-Team2.git
  Navigate to the project directory by running cd COMP3220-Team2

2. Setting Up the Python Environment
  You'll need to install some Python libraries to run the Python scripts.
  Ensure pip (Python's package manager) is installed on your system.
  Install the required Python libraries:
  Run pip install pandas geopandas
  These are required for handling CSV and KML files.

3. Setting Up the React Frontend
  Navigate to the React app folder:
  Run cd windsor-heatmap
  Install the required Node.js packages:
  Run npm install to install all dependencies.

4. Running the React App
  To start the React development server, run npm start in the windsor-heatmap directory.
  The app will be accessible at http://localhost:3000.

5. Running Python Scripts
  Ensure Python is installed and navigate to the python folder.
  To process the CSV or KML data, run:
  python3 python/process_data.py to process ward boundary data.
  python3 python/service_request.py to handle service requests.
