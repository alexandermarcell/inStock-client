import axios from "axios";
import { Component } from "react";
import GenerateInventory from "../../components/GenerateInventory/GenerateInventory";
import GenerateWarehouseDetails from "../../components/GenerateWarehouseDetails/GenerateWarehouseDetails";
import "./WarehouseDetailsPage.scss";

const siteWarehouse = 'https://alex-instock-server.herokuapp.com/warehouse';

export default class WarehouseDetailsPage extends Component {
  state = {
    currentWarehouse: [],
    currentInventory: [],
    currentContact: [],
  };

  warehouseId = this.props.match.params.id;

  componentDidMount() {
    axios
      .get(`${siteWarehouse}${this.warehouseId}`)
      .then((response) => {
        this.setState({
          currentWarehouse: response.data.warehouse,
          currentInventory: [...response.data.inventory],
          currentContact: response.data.warehouse.contact,
        });
      });
  }

  render() {
    return (
      <div className="warehouse__body">
        <div className="warehouse__bg"></div>
        <GenerateWarehouseDetails
          warehouse={this.state.currentWarehouse}
          contact={this.state.currentContact}
        />
        <GenerateInventory inventory={this.state.currentInventory} />
      </div>
    );
  }
}
