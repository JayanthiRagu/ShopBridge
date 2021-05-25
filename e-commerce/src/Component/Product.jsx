import React, { Component } from 'react';
import axios from 'axios';
import './Product.css';

class Product extends Component {
    constructor()
    {
        super();
        this.state={
            //To list items from get API reponse
            datas:[],

            //To add new item to the inventory
            name:'',
            description:'',
            price:'',

            //Modify an item in the inventory
            modify_id:'',
            modify_name:'',
            modify_description:'',
            modify_price:'',

            //Delete an item from the inventory
            delete_id:'',

            //Radio toggle
            showPost:false,
            showGet:false,
            showPut:false,
            showDelet:false,
            isValid:true,
            errors:{
                name:'',
                price:'',
                description:'',
                modify_name:'',
                modify_price:'',
                modify_description:'',
                modify_id:'',
                delete_id:'',
                form:''
            }
        };
    }
    
    //To add new item to the inventory
    onSubmitHandler = (e)=>{
        if(this.state.name.length==0||this.state.description.length==0||this.state.price.length==0)
        {
            this.setState({errors:{
                form:"Please enter all the fields"},
                isValid:false
            });
        }
        else if(this.state.isValid==true)
        {
            let item = {
                name:this.state.name,
                description:this.state.description,
                price:this.state.price
            }
            axios.post("https://fakestoreapi.com/products",{item}).then(res=>{
                console.log(res);
                if(res.status===200)
                {
                    alert("Item is added Successfully");
                }
            }).catch(err=>{
                console.log(err);
            });
            
        }
        e.preventDefault();
        
    }

    onNameHandler = (e)=>{
        this.setState({name:e.target.value});
        let regex_name=/^[A-Za-z]{5,20}$/;
        if(!regex_name.test(this.state.name) || this.state.name.length===0){
            this.setState({errors:{name:'Please enter name'},isValid:false});
        }
        else{
            this.setState({errors:{name:''},isValid:true});
        }
    }
    onDescriptionHandler=(e)=>{
        this.setState({description:e.target.value});
        let regex_description=/^[A-Za-z]{1,100}$/;
        if(!regex_description.test(this.state.description) || this.state.description.length===0){
            this.setState({errors:{description:'Please enter description'},isValid:false});
        }
        else{
            this.setState({errors:{description:''},isValid:true});
        }
    }
    onPriceHandler=(e)=>{
        this.setState({price:e.target.value});
        let regex_price=/^[0-9]{1,5}$/;
        if(!regex_price.test(this.state.price) || this.state.price.length===0){
            this.setState({errors:{price:'Please enter price'},isValid:false});
        }
        else{
            this.setState({errors:{price:''},isValid:true});
        }
    }

    //Modify an item in the inventory
    onModifySubmitHandler=(e)=>{

        if(this.state.modify_id.length==0||this.state.modify_name.length==0||this.state.modify_description.length==0||this.state.modify_price.length==0)
        {
            this.setState({errors:{
                form:"Please enter all the fields"},
                isValid:false
            });
        }
        else if(this.state.isValid==true)
        {
            let item = {
                modify_id:this.state.modify_id,
                modify_name:this.state.modify_name,
                modify_description:this.state.modify_description,
                modify_price:this.state.modify_price
            }
            axios.put("https://fakestoreapi.com/products/"+this.state.modify_id,{item}).then(res=>{
                console.log(res);
                if(res.status===200)
                {
                    alert("Item is updated Successfully");
                }
            }).catch(err=>{
                console.log(err);
            });
        }
        e.preventDefault();
    }
    onModifyIdHandler= (e)=>{
        this.setState({modify_id:e.target.value})
        let regex_id=/^[0-9]{1,5}$/;
        if(!regex_id.test(this.state.modify_id) || this.state.modify_id.length===0){
            this.setState({errors:{modify_id:'Please enter product id'},isValid:false});
        }
        else{
            this.setState({errors:{modify_id:''},isValid:true});
        }
    }
    onModifyNameHandler= (e)=>{
        this.setState({modify_name:e.target.value})
        let regex_name=/^[A-Za-z]{5,20}$/;
        if(!regex_name.test(this.state.modify_name) || this.state.modify_name.length===0){
            this.setState({errors:{modify_name:'Please enter name'},isValid:false});
        }
        else{
            this.setState({errors:{modify_name:''},isValid:true});
        }
    }
    onModifyDescriptionHandler= (e)=>{
        this.setState({modify_description:e.target.value})
        let regex_description=/^[A-Za-z]{1,100}$/;
        if(!regex_description.test(this.state.modify_description) || this.state.modify_description.length===0){
            this.setState({errors:{modify_description:'Please enter description'},isValid:false});
        }
        else{
            this.setState({errors:{modify_description:''},isValid:true});
        }
    }
    onModifyPriceHandler= (e)=>{
        this.setState({modify_price:e.target.value})
        let regex_price=/^[0-9]{1,5}$/;
        if(!regex_price.test(this.state.modify_price) || this.state.modify_price.length===0){
            this.setState({errors:{modify_price:'Please enter price'},isValid:false});
        }
        else{
            this.setState({errors:{modify_price:''},isValid:true});
        }
    }



    //Delete an item from the inventory
    onDeleteSubmitHandler=(e)=>{

        if(this.state.delete_id.length==0)
        {
            this.setState({errors:{
                form:"Please enter product id"},
                isValid:false
            });
        }
        else if(this.state.isValid==true)
        {
            axios.delete("https://fakestoreapi.com/products/"+this.state.delete_id).then(res=>{
                console.log(res);
                if(res.status===200)
                {
                    alert("Item is deleted Successfully");
                }
            }).catch(err=>{
                console.log(err);
            });
        }
        e.preventDefault();
    }
    onDeleteIdHandler= (e)=>{
        this.setState({delete_id:e.target.value})
        let regex_id=/^[0-9]{0,5}$/;
        if(!regex_id.test(this.state.delete_id) || this.state.delete_id.length===0){
            this.setState({errors:{delete_id:'Please enter product id'},isValid:false});
        }
        else{
            this.setState({errors:{delete_id:''},isValid:true});
        }
    }


    //To list the items in the inventory
    componentDidMount(){
        //Sample API format
        axios.get("https://fakestoreapi.com/products").then(res=>{
            console.log(res.data);
             this.setState({datas:res.data});
        }).catch(err=>{
            console.log(err);
        });
    }

    //To handle Radio buttons
    onSubmitRadioHandler=(e)=>{
        console.log(e.target.item.value);
        switch(e.target.item.value)
        {
            case "post":
            {
                this.setState({showPost:true,showPut:false,showDelete:false,showGet:false});
                break;
            }
            case "put":
            {
                this.setState({showPut:true,showGet:false,showDelete:false,showPost:false});
                break;
            }
            case "delete":
            {
                this.setState({showDelete:true,showGet:false,showPost:false,showPut:false});
                break;
            }
            case "get":
            {
                this.setState({showGet:true,showPost:false,showPut:false,showDelete:false});
                break;
            }
        }
        e.preventDefault();
    }
    render() {
        return (
            <div class="pageContainer">
                <p class="header">ShopBridge</p>
                <p class="heading">Product Admin Page</p>
                <div class="radioContainer">
                    <form onSubmit={this.onSubmitRadioHandler}>
                        <input type="radio" id="post" name="item" value="post"/>
                        <label for="post">Add an item</label><br></br>
                        <input type="radio" id="put" name="item" value="put"/>
                        <label for="put">Update an item</label><br></br>
                        <input type="radio" id="delete" name="item" value="delete"/>
                        <label for="other">Delete an item</label><br></br>
                        <input type="radio" id="get" name="item" value="get"/>
                        <label for="other">List all items</label><br></br>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                {/* //To list all the items */}
                 {this.state.showGet && <div>
                    <p class="heading">List of all items</p> 
                     <div class="getPanel">
                {this.state.datas.length>0 && this.state.datas.map(data=>(
                    <span key={data.id}>
                        <div class="getPanel1">
                        <span><img src={data.image} alt="image" width="80px" height="80px"/></span><br></br><br></br>
                        <span class="price">Price:{data.price}</span><br></br><br></br>
                        <span class="name">{data.title}</span><br></br><br></br>
                        <span>{data.description}</span>
                        </div>
                    </span>
                ))}
                </div>
                </div>}
                {/* To add new item to the inventory */}
                {this.state.showPost && <div class="postPanel">
                <p class="heading">Add an item</p>
                <span class="error">{this.state.errors.form}</span>
                    <form onSubmit={this.onSubmitHandler}>
                    <p class="grid">
                        <span class="label">Name:</span>
                        <span class="input">
                            <input type="text" onChange={this.onNameHandler}></input><br></br>
                            <span class="error">{this.state.errors.name}</span>
                        </span><br></br>
                    </p>
                    <p class="grid">
                        <span class="label">Description:</span>
                        <span class="input">
                            <input type="text" onChange={this.onDescriptionHandler}></input><br></br>
                            <span class="error">{this.state.errors.description}</span>
                        </span><br></br>
                    </p>
                    <p class="grid">
                        <span class="label">Price:</span>
                        <span class="input">
                            <input type="text" onChange={this.onPriceHandler}></input><br></br>
                            <span class="error">{this.state.errors.price}</span>
                        </span><br></br>
                    </p>
                        <button type="submit">Submit</button>
                    </form>
                </div>}

                {/* To update an item to the inventory */}
                {this.state.showPut && <div class="putPanel">
                <p class="heading">Update an item</p>
                <span class="error">{this.state.errors.form}</span>
                    <form onSubmit={this.onModifySubmitHandler}>
                        <p class="grid">
                        <span class="label">Id:</span>
                        <span class="input">
                            <input type="text" onChange={this.onModifyIdHandler}></input><br></br>
                            <span class="error">{this.state.errors.modify_id}</span>
                        </span><br></br></p>
                        <p class="grid"><span class="label">Name:</span>
                        <span class="input">
                            <input type="text" onChange={this.onModifyNameHandler}></input><br></br>
                            <span class="error">{this.state.errors.modify_name}</span>
                        </span><br></br></p>
                        <p class="grid"><span class="label">Description:</span>
                        <span class="input">
                            <input type="text" onChange={this.onModifyDescriptionHandler}></input><br></br>
                            <span class="error">{this.state.errors.modify_description}</span>
                        </span><br></br></p>
                        <p class="grid">
                        <span class="label">Price:</span>
                        <span class="input">
                            <input type="text" onChange={this.onModifyPriceHandler}></input><br></br>
                            <span class="error">{this.state.errors.modify_price}</span>
                        </span><br></br></p>
                        <button type="submit">Submit</button>
                    </form>
                </div>}
                {/* Delete an item */}
                {this.state.showDelete && <div class="deletePanel">
                <p class="heading">Delete an item</p>
                <span class="error">{this.state.errors.form}</span>
                    <form onSubmit={this.onDeleteSubmitHandler}>
                        <p class="grid">
                            <span class="label">Product Id:</span>
                            <span class="input">
                                <input type="text" onChange={this.onDeleteIdHandler}></input><br></br>
                                <span class="error">{this.state.errors.delete_id}</span>
                            </span><br></br>
                        </p>
                        <button type="submit">Submit</button>
                    </form>
                </div>}
            </div>
        );
    }
}

export default Product;
