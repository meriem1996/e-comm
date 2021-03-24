import React, { Component } from 'react'
import AuthContext from '../shared/auth/auth-context'
import Categorie from '../components/categorie'
import CategorieModal from './../models/categorie-model'
import axios from '../utils/axios'

export default class DashboardPage extends Component {
    constructor(){
        super()
        this.state = {
          id:"",
          name:"",
          description:"",
          list_categorie_data:[
              // new CategorieModal('','mmmmmm','vvvvvvvvv'),
              // new CategorieModal('','ppp','bbb'),
              // new CategorieModal('','cccc','ttt')
          ],
          backupList:[],
        }
      }
    render() {
        return (
           <Categorie 
           handleChange={this.handleChangeInput}
           handleAddSubmit={this.handleAdd}
           dataList={this.state.list_categorie_data}
           />
            
        )
    }
    handleChangeInput = (event) => {
        let value = event.target.value;
        let input = event.target.name;
         console.log(value, input)
        this.setState({ [input]: value })
      }
    
    handleAdd = (event) =>{
        event.preventDefault();
        event.target.reset();
    if (this.state.name == "" || this.state.description == "" ) {
        alert("veuillez remplir tous les champs")
      }
      else{
          let newCategorie = new CategorieModal(
              0,
              this.state.name,
              this.state.description          
              );
              this.setState({
                name: "",
                description: "",
              })
              //ajouter categorie 
              let nvCategorie = this.state.list_categorie_data;
        
              nvCategorie.push(newCategorie);
              this.setState({ list_categorie_data: nvCategorie });
        
              const data_categorie = {
                name: newCategorie.name,
                description: newCategorie.description,
                
              }
              console.log(data_categorie)
              //ajouter une categorie a la partie serveur "firebase" avec axios
              axios.post("categorie.json", data_categorie).then((response) => {
                // console.log(response)
                let id_new_categorie = response.dataList.name;
                //chercher la categorie qui a l'id == 0 sur la liste
                let newCategorie = this.state.list_categorie_data;
                newCategorie.forEach(c => {
                  if (c.id == 0) {
                    c.id = id_new_categorie;
                  }
                  
                })
                this.setState({ list_categorie_data: newCategorie })
              })
      
    }
}
componentDidMount() {
  axios.get("categorie.json").then((response) => {
    if (response.data != null) {
      //extraire toutes les cles du l'objet data
      let keys = Object.keys(response.data)
      //parcourir les keys
      let listCategorie = keys.map((k) => {
        console.log(response)
        let cat = new CategorieModal(
          k,
          response.data[k].name,
          response.data[k].description
        );
        return cat;
        //affichage des proprietes de l'objet datalist

      });

      //ajouter la liste
      this.setState({ list_categorie_data: listCategorie })
      //ajouter un backup a la liste
      this.setState({backupList: listCategorie })
      console.log(listCategorie)
    }
  })
}
}

// DashboardPage.contextType = AuthContext;
