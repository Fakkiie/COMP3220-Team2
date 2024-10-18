import pandas as pd

#class to process the service requests 
class ServiceRequest:
    #init the file path
    def __init__(self, file_path):
        self.file_path = file_path
        self.requests_data = None

    #loads the csv file and reads it in to dataframe
    def load_csv(self):
        try:
            self.requests_data = pd.read_csv(self.file_path)
            print(f"CSV file loaded successfully from {self.file_path}")
        except FileNotFoundError:
            print(f"File not found: {self.file_path}")
        except Exception as e:
            print(f"An error occurred while loading the file: {e}")
            
    #gets a specific request based on index (this needs to change so we can read all requests in, as well as requests people upload)
    def get_request(self, index=0):
        if self.requests_data is not None:
            try:
                request = self.requests_data.iloc[index]
                return request
            except IndexError:
                print(f"No request found at index {index}.")
        else:
            print("No data loaded. Please load the CSV file first.")
            return None

#main exec for testing, same as process data
if __name__ == "__main__":
    file_path = "../data/AllServiceRequests_YTD.csv"
    service_processor = ServiceRequest(file_path)
    service_processor.load_csv()
    
    first_request = service_processor.get_request(0)
    
    if first_request is not None:
        print(first_request)
