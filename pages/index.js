import Head from 'next/head'
import React, { Component } from "react";
import { faTrash, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: 1,
      price: this.props.price
    };
  }


  buttonPlus(e) {
    this.setState({
      qty: this.state.qty + 1,
      price: parseFloat(this.state.price) + parseFloat(this.props.price)
    });

  }
  buttonMinus(e) {
    if (this.state.qty != 0) {
      this.setState({
        qty: this.state.qty - 1,
        price: parseFloat(this.state.price) - parseFloat(this.props.price)
      });
    }
  }
  render() {
    return (
      <>
        <div className="flex">
          <div className="w-6/12 md:w-2/12">
            <img src={this.props.img} alt={this.props.name} width="90%" className="rounded-lg shadow-md" />
          </div>
          <div className="w-6/12 md:w-7/12 space-y-2">
            <div className="text-lg font-medium">{this.props.name}</div>
            <div className="text-sm text-gray-500">{this.props.type}</div>
            <div className="text-sm text-gray-500">COLOR {this.props.color}</div>
            <div className="text-sm text-gray-500">SIZE {this.props.size}</div>
            <div className="md:flex space-y-2 md:space-y-0">
              <div className="w-full md:w-5/12">
                <div className="flex text-sm text-gray-500 items-center space-x-2 cursor-pointer" onClick={this.props.onRemoveProduct.bind(this, this.props.id - 1)}>
                  <div className="w-1/12">
                    <FontAwesomeIcon className="text-sm" icon={faTrash}></FontAwesomeIcon>
                  </div>
                  <div className="w-11/12">
                    <p>REMOVE ITEM</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12">
                <div className="flex text-sm text-gray-500 items-center space-x-2 cursor-pointer" onClick={() => { alert(`${this.props.name} : Success move to Wishlist`) }}>
                  <div className="w-1/12">
                    <FontAwesomeIcon className="text-sm" icon={faHeart}></FontAwesomeIcon>
                  </div>
                  <div className="w-11/12">
                    <p>MOVE TO WISTLIST</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block md:w-3/12 text-center relative">
            <div className="flex justify-end">
              <div className={`border py-1 px-4 rounded-l-lg text-lg ${(this.state.qty < 1) ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => { this.buttonMinus(this.props.id) }}>-</div>
              <div className={`border py-2 px-5 cursor-default value-count-${this.props.id}`}>{this.state.qty}</div>
              <div className="border py-1 px-4 rounded-r-lg text-lg cursor-pointer" onClick={() => { this.buttonPlus(this.props.id) }}>+</div>
            </div>
            <div className="text-right mr-5 text-gray-500">{this.props.note}</div>
            <div className="text-lg font-medium absolute bottom-0 right-0">${this.state.price}</div>
          </div>
        </div>
        <div className="block md:hidden md:w-3/12 text-center relative mt-3">
          <div className="flex">
            <div className="flex justify-end">
              <div className={`border py-1 px-4 rounded-l-lg text-lg ${(this.state.qty < 1) ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => { this.buttonMinus(this.props.id) }}>-</div>
              <div className={`border py-2 px-5 cursor-default value-count-${this.props.id}`}>{this.state.qty}</div>
              <div className="border py-1 px-4 rounded-r-lg text-lg cursor-pointer" onClick={() => { this.buttonPlus(this.props.id) }}>+</div>
            </div>
            <div className="text-lg font-medium absolute bottom-2 right-0">${this.state.price}</div>
          </div>
        </div>
      </>
    )
  }
}

class ShoppingCart extends Component {
  state = {
    products: [
      {
        id: "1",
        img: "/produk/blue.jpg",
        name: "Blue denim shirt",
        type: "SHIRT BLUE",
        color: "BLUE",
        size: "M",
        price: "17.99",
        note: "(note, 1 price)",
        count: 1
      },
      {
        id: "2",
        img: "/produk/red.jpg",
        name: "Red hoodie",
        type: "HOODIE RED",
        color: "RED",
        size: "M",
        price: "35.99",
        note: "",
        count: 1
      },
    ],
  }

  onRemoveProduct = (id) => {
    let dataProduct = this.state.products;
    let indexValue = dataProduct.map((e) => { return e.id }).indexOf(id);

    if (indexValue !== -1) {
      console.log("hapus")
      dataProduct.splice(indexValue, 1);
    }
    this.setState({ products: dataProduct })
  };

  actionButton = (type, id) => {
    let dataProduct = this.state.products;
    let indexValue = dataProduct.map((e) => { return e.id }).indexOf(id);

    if (type === "plus") {
      dataProduct[indexValue].count += 1;
    } else if (type === "minus") {
      dataProduct[indexValue].count -= 1;
    }

    this.setState({ products: dataProduct })

  }

  render() {
    const dataProduct = this.state.products

    console.log("dataProduct", dataProduct)
    return (
      <div className="h-screen">
        <Head>
          <title>Test JAVAN</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="">
          <div className="text-center py-8 shadow-md text-2xl font-medium">
            Shopping cart
          </div>

          <div className="mx-0 md:mx-40 sm:mx-0">
            <div className="w-full md:p-12 sm:p-3 lg:flex">
              <div style={{ height: "fit-content" }} className="w-12/12 md:w-8/12 rounded-lg shadow-lg p-5 mr-0 lg:mr-5">
                <div className="text-xl font-medium mb-4">Cart {dataProduct.length} (items)</div>
                {dataProduct.length > 0 ?
                  dataProduct.map((item, index) => (
                    <div key={index}>
                      <div className="flex">
                        <div className="w-6/12 md:w-2/12">
                          <img src={item.img} alt={item.name} width="90%" className="rounded-lg shadow-md" />
                        </div>
                        <div className="w-6/12 md:w-7/12 space-y-2">
                          <div className="text-lg font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.type}</div>
                          <div className="text-sm text-gray-500">COLOR {item.color}</div>
                          <div className="text-sm text-gray-500">SIZE {item.size}</div>
                          <div className="md:flex space-y-2 md:space-y-0">
                            <div className="w-full md:w-5/12">
                              <div className="flex text-sm text-gray-500 items-center space-x-2 cursor-pointer" onClick={() => { this.onRemoveProduct(item.id) }}>
                                <div className="w-1/12">
                                  <FontAwesomeIcon className="text-sm" icon={faTrash}></FontAwesomeIcon>
                                </div>
                                <div className="w-11/12">
                                  <p>REMOVE ITEM</p>
                                </div>
                              </div>
                            </div>
                            <div className="w-full md:w-6/12">
                              <div className="flex text-sm text-gray-500 items-center space-x-2 cursor-pointer" onClick={() => { alert(`${item.name} : Success move to Wishlist`) }}>
                                <div className="w-1/12">
                                  <FontAwesomeIcon className="text-sm" icon={faHeart}></FontAwesomeIcon>
                                </div>
                                <div className="w-11/12">
                                  <p>MOVE TO WISTLIST</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="hidden md:block md:w-3/12 text-center relative">
                          <div className="flex justify-end">
                            <div className={`border py-1 px-4 rounded-l-lg text-lg ${(item.count < 2) ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => { if (item.count > 1) { this.actionButton("minus", item.id) } }}>-</div>
                            <div className={`border py-2 px-5 cursor-default value-count-${item.id}`}>{item.count}</div>
                            <div className="border py-1 px-4 rounded-r-lg text-lg cursor-pointer" onClick={() => { this.actionButton("plus", item.id) }}>+</div>
                          </div>
                          <div className="text-right mr-5 text-gray-500">{item.note}</div>
                          <div className="text-lg font-medium absolute bottom-0 right-0">${parseFloat(item.price) * item.count}</div>
                        </div>
                      </div>
                      <div className="block md:hidden md:w-3/12 text-center relative mt-3">
                        <div className="flex">
                          <div className="flex justify-end">
                            <div className={`border py-1 px-4 rounded-l-lg text-lg ${(item.count < 1) ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => { if (item.count > 1) { this.actionButton("minus", item.id) } }}>-</div>
                            <div className={`border py-2 px-5 cursor-default value-count-${item.id}`}>{item.count}</div>
                            <div className="border py-1 px-4 rounded-r-lg text-lg cursor-pointer" onClick={() => { this.actionButton("plus", item.id) }}>+</div>
                          </div>
                          <div className="text-lg font-medium absolute bottom-2 right-0">${parseFloat(item.price) * item.count}</div>
                        </div>
                      </div>
                      {(index != dataProduct.length - 1) && <div className="w-full border-b border-gray-300 my-4"></div>}
                    </div>
                  ))
                  :
                  <div className='text-center'>
                    Empty Cart
                  </div>
                }


              </div>
              <div className="sm:w-12/12 md:w-4/12 mt-5 sm:mt-0">
                <div className="rounded-lg shadow-md p-5">
                  <div className="text-xl font-medium">The total amount of</div>
                  <div className="flex mt-5 text-gray-500">
                    <div className="w-8/12">Temporary amount</div>
                    <div className="w-4/12 text-right">$53.90</div>
                  </div>
                  <div className="flex py-2 border-b text-gray-500">
                    <div className="w-8/12">Shipping</div>
                    <div className="w-4/12 text-right">Gratis</div>
                  </div>
                  <div className="flex py-2">
                    <div className="w-8/12 text-md font-medium">The total amount of (including VAT)</div>
                    <div className="w-4/12 text-right">$53.98</div>
                  </div>

                  <div className="bg-blue-600 text-white mt-5 text-center px-4 py-2 rounded hover:bg-blue-800 focus:outline-none">GO TO CHECKOUT</div>
                </div>
                <div className="rounded-lg shadow-md p-5 mt-5 text-gray-500">
                  Add discount code [optional]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShoppingCart;
