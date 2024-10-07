import React,{useState,useEffect} from "react";


export default function DeleteArray() {
    
        const [fetchedData, setFetchedData] = useState([]);
        const [selectedItems, setSelectedItems] = useState(new Set()); // Track selected items
      
        // Fetch data from API
        async function fetchingData() {
          try {
            let response = await fetch('https://jsonplaceholder.typicode.com/todos/');
            let data = await response.json();
            console.log(data);
            setFetchedData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
      
        useEffect(() => {
          fetchingData();
        }, []);
      
        // Function to handle selection of an item
        const handleSelectItem = (id) => {
          setSelectedItems((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(id)) {
              newSelected.delete(id); // Deselect if already selected
            } else {
              newSelected.add(id); // Select the item
            }
            return newSelected;
          });
        };
      
        // Function to handle deletion of selected items
        const deleteSelectedItems = () => {
          setFetchedData((prevData) => prevData.filter((item) => !selectedItems.has(item.id)));
          setSelectedItems(new Set()); // Clear selection
        };
      
        return (
            <div className="container mt-5">
              <h1 className="text-center mb-4">E Kart</h1>
              <div className="row">
                {fetchedData.map((ele) => (
                  <div key={ele.id} className="col-md-4">
                    <div className="card mb-3 shadow-sm">
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <input
                            type="checkbox"
                            className="form-check-input me-2"
                            checked={selectedItems.has(ele.id)}
                            onChange={() => handleSelectItem(ele.id)}
                          />
                          <span className="card-title">{ele.title}</span>
                        </div>
                        <button
                          className="btn btn-danger"
                          onClick={() =>
                            setFetchedData((prevData) => prevData.filter((item) => item.id !== ele.id))
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary"
                  onClick={deleteSelectedItems}
                  disabled={selectedItems.size === 0} // Disable if no items are selected
                >
                  Delete Selected
                </button>
              </div>
            </div>
          );
      }
      
      