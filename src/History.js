import React from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

class History extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            today:'',
            yesterday:'',
            twodays:'',
            threedays:'',
            fourdays:''
        }

        this.getBTC = this.getBTC.bind(this);
        this.getLTC = this.getLTC.bind(this);
        this.getETH = this.getETH.bind(this);       
    } 

        getBTC(date){
            return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=INR&ts=' + date);
        }
        getLTC(date){
            return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=INR&ts=' + date);
        }
        getETH(date){
            return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=INR&ts=' + date);
        }

        getToday(){
            let time = moment().unix()
            axios.all([this.getBTC(time), this.getLTC(time), this.getETH(time)])
            .then(axios.spread((btc,ltc,eth) => {
                let x = {
                    date : moment.unix(time).format("Do MMMM YYYY"),
                    btc : btc.data.BTC.INR,
                    ltc : ltc.data.LTC.INR,
                    eth : eth.data.ETH.INR
                }
                localStorage.setItem('today', JSON.stringify(x))
                this.setState({today:x})
            }))
        }

        getYesterday(){
            let time = moment().subtract(1,'days').unix()
            axios.all([this.getBTC(time), this.getLTC(time), this.getETH(time)])
            .then(axios.spread((btc,ltc,eth) => {
                let x = {
                    date : moment.unix(time).format("Do MMMM YYYY"),
                    btc : btc.data.BTC.INR,
                    ltc : ltc.data.LTC.INR,
                    eth : eth.data.ETH.INR
                }
                localStorage.setItem('yesterday', JSON.stringify(x))
                this.setState({yesterday:x})
            }))
        }

        getTwoDays(){
            let time = moment().subtract(2,'days').unix()
            axios.all([this.getBTC(time), this.getLTC(time), this.getETH(time)])
            .then(axios.spread((btc,ltc,eth) => {
                let x = {
                    date : moment.unix(time).format("Do MMMM YYYY"),
                    btc : btc.data.BTC.INR,
                    ltc : ltc.data.LTC.INR,
                    eth : eth.data.ETH.INR
                }
                localStorage.setItem('twodays', JSON.stringify(x))
                this.setState({twodays:x})
            }))
        }

        getThreeDays(){
            let time = moment().subtract(3,'days').unix()
            axios.all([this.getBTC(time), this.getLTC(time), this.getETH(time)])
            .then(axios.spread((btc,ltc,eth) => {
                let x = {
                    date : moment.unix(time).format("Do MMMM YYYY"),
                    btc : btc.data.BTC.INR,
                    ltc : ltc.data.LTC.INR,
                    eth : eth.data.ETH.INR
                }
                localStorage.setItem('threedays', JSON.stringify(x))
                this.setState({threedays:x})
            }))
        }

        getFourDays(){
            let time = moment().subtract(4,'days').unix()
            axios.all([this.getBTC(time), this.getLTC(time), this.getETH(time)])
            .then(axios.spread((btc,ltc,eth) => {
                let x = {
                    date : moment.unix(time).format("Do MMMM YYYY"),
                    btc : btc.data.BTC.INR,
                    ltc : ltc.data.LTC.INR,
                    eth : eth.data.ETH.INR
                }
                localStorage.setItem('fourdays', JSON.stringify(x))
                this.setState({fourdays:x})
            }))
        }

        componentWillMount(){
            if (!navigator.onLine) {
                this.setState({ today: JSON.parse(localStorage.getItem('today')) })
                this.setState({ yesterday: JSON.parse(localStorage.getItem('yesterday')) })
                this.setState({ twodays: JSON.parse(localStorage.getItem('twodays')) })
                this.setState({ threedays: JSON.parse(localStorage.getItem('threedays')) })
                this.setState({ fourdays: JSON.parse(localStorage.getItem('fourdays')) })
            }
            this.getToday()
            this.getYesterday()
            this.getTwoDays()
            this.getThreeDays()
            this.getFourDays()
        }

    

    render(){
        return(
            <div className="history">                
                <div className="container history-container">
                    <h3>Past 5 days</h3>
                    <div className="thumbnail">
                        <div className="row">
                            <h6>{this.state.today.date}</h6>
                            <div className="col-xs-4">
                                <p><span>1 BTC</span> <br/> ₹ {this.state.today.btc}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><span>1 LTC</span> <br/> ₹ {this.state.today.ltc}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><span>1 ETH</span> <br/> ₹ {this.state.today.eth}</p> 
                            </div>
                        </div> 
                        
                        <div className="row">
                            <h6>{this.state.yesterday.date}</h6>
                            <div className="col-xs-4">
                                <p><span>1 BTC</span> <br/> ₹ {this.state.yesterday.btc}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><span>1 LTC</span> <br/> ₹ {this.state.yesterday.ltc}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><span>1 ETH</span> <br/> ₹ {this.state.yesterday.eth}</p> 
                            </div>
                        </div>
                        <div className="row">
                            <h6>{this.state.twodays.date}</h6> 
                            <div className="col-xs-4">
                                <p><span>1 BTC</span> <br/> ₹ {this.state.twodays.btc}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><span>1 LTC</span> <br/> ₹ {this.state.twodays.ltc}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><span>1 ETH</span> <br/> ₹ {this.state.twodays.eth}</p> 
                            </div>
                        </div>
                        <div className="row">
                            <h6>{this.state.threedays.date}</h6> 
                            <div className="col-xs-4">
                                <p><span>1 BTC</span> <br/> ₹ {this.state.threedays.btc}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><span>1 LTC</span> <br/> ₹ {this.state.threedays.ltc}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><span>1 ETH</span> <br/> ₹ {this.state.threedays.eth}</p> 
                            </div>
                        </div>
                        <div className="row"> 
                            <h6>{this.state.fourdays.date}</h6>
                            <div className="col-xs-4">
                                <p><span>1 BTC</span> <br/> ₹ {this.state.fourdays.btc}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><span>1 LTC</span> <br/> ₹ {this.state.fourdays.ltc}</p>
                            </div>
                            <div className="col-xs-4">
                                <p><span>1 ETH</span> <br/> ₹ {this.state.fourdays.eth}</p> 
                            </div>
                        </div>                         
                    </div>
                </div>
            </div>
        )
    }
}

export default History