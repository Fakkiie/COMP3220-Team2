**Project Setup
Prerequisites**<br/>
Make sure you have the following installed on your machine:
Python 3.x<br/>
Node.js (which includes npm)<br/>

**Setup Instructions**<br/>

1. **Clone the Repository**<br/>
  First, clone the project to your local machine:<br/>
  Run git clone https://github.com/Fakkiie/COMP3220-Team2.git<br/>
  Navigate to the project directory by running cd COMP3220-Team2<br/>

2. **Setting Up the Python Environment**<br/>
  You'll need to install some Python libraries to run the Python scripts.<br/>
  Ensure pip (Python's package manager) is installed on your system.<br/>
  Install the required Python libraries:<br/>
  Run pip install pandas geopandas<br/>
  These are required for handling CSV and KML files.<br/>

3. **Setting Up the React Frontend**<br/>
  Navigate to the React app folder:<br/>
  Run cd windsor-heatmap<br/>
  Install the required Node.js packages:<br/>
  Run npm install to install all dependencies.<br/>

4. **Running the React App**<br/>
  To start the React development server, run npm start in the windsor-heatmap directory.<br/>
  The app will be accessible at http://localhost:3000.<br/>

5. Running Python Scripts
  Ensure Python is installed and navigate to the python folder.<br/>
  To process the CSV or KML data, run:<br/>
  python3 python/process_data.py to process ward boundary data.<br/>
  python3 python/service_request.py to handle service requests.<br/>
