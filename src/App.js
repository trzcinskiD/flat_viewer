import React, { Component } from "react";
import { client } from "./mongo/db";
import { AnonymousCredential } from "mongodb-stitch-browser-sdk";
import MaterialTable from "material-table";
import getFlats from "./mongo/getFlats";
import editFlat from "./mongo/editFlat";
import deleteFlat from "./mongo/deleteFlat";

class App extends Component {
  state = {
    flats: []
  };

  componentDidMount() {
    client.auth.loginWithCredential(new AnonymousCredential()).then(
      async () => {
        const flats = await getFlats();
        this.setState({ flats });
      },
      err => console.log(err)
    );
  }

  render() {
    return (
      <div className="App">
        <MaterialTable
          columns={[
            {
              title: "Zdjęcie",
              field: "photo",
              editable: "never",
              render: rowData => <img src={rowData.photo} alt="flat_img" />
            },
            { title: "Nazwa ogłoszenia", field: "title", editable: "never" },
            { title: "Dodane", field: "time", editable: "never" },
            { title: "Lokalizacja", field: "location", editable: "never" },
            { title: "Cena", field: "price", editable: "never" },
            { title: "Cena rzeczywista", field: "realPrice" },
            { title: "Link", field: "url", editable: "never", render: rowData => <a href={rowData.url}>LINK</a> },
            { title: "Warte uwagi!", field: "love", type: "boolean", hidden: true }
          ]}
          data={this.state.flats}
          title="Mieszkania z OLX"
          options={{
            pageSize: 30,
            pageSizeOptions: [15, 30, 50],
            actionsColumnIndex: 8,
            headerStyle: { backgroundColor: "#c4c4c4e6", fontWeight: "bold" },
            rowStyle: rowData => ({ backgroundColor: rowData.love ? "yellow" : "white" })
          }}
          editable={{
            isDeletable: rowData => rowData.love !== true,
            onRowUpdate: async (newData, oldData) => {
              const newDoc = await editFlat(oldData._id, newData.realPrice, oldData.love);
              const data = this.state.flats;
              const index = data.findIndex(e => e._id.toString() === newData._id);
              data[index] = newDoc;
              this.setState({ flats: data });
            },
            onRowDelete: async oldData => {
              let data = this.state.flats;
              const index = data.findIndex(e => e._id === oldData._id);
              await deleteFlat(oldData._id, oldData.url);
              data.splice(index, 1);
              this.setState({ flats: data });
            }
          }}
          actions={[
            {
              icon: `favorite`,
              tooltip: "Zaznacz jeśli warto!",
              onClick: async (event, rowData) => {
                const newDoc = await editFlat(rowData._id, rowData.realPrice, !rowData.love);
                const data = this.state.flats;
                const index = data.findIndex(e => e._id === rowData._id);
                data[index] = newDoc;
                this.setState({ flats: data });
              }
            }
          ]}
        />
      </div>
    );
  }
}

export default App;
