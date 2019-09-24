import React, {Component} from 'react';
import { View, Text, Button, TextInput} from 'react-native'
import BackgroundTask from 'react-native-background-task'


BackgroundTask.define(() => {
    postJson()
    BackgroundTask.finish()
  })




const url = ('https://testprog-d0e15.firebaseio.com/quiz.json')








export default class CreateCard extends Component {

    
   
    
    constructor(props) {
        super(props);
        this.state = {
            cardName: 'name',
            cardPrice: 'price',
            cardColor: 'color'
        }
    }
    

    render() {

        

        
        const cardJson = this.state

        function postJson() {
            fetch(url, {
                method: 'post',
                body: JSON.stringify(cardJson)
            })
        }
        
        return(
            <View>
                
                <TextInput
                style={{borderWidth:1, borderColor: 'black', marginBottom: 15, height: 50, width: 200}}
                    placeholder={this.state.cardName}
                    onChangeText={(nameText) => this.setState({cardName: nameText})}
                />
                <TextInput
                style={{borderWidth:1, borderColor: 'black', marginBottom: 15, height: 50, width: 200}}
                    placeholder={this.state.cardPrice}
                    onChangeText={(priceText) => this.setState({cardPrice: priceText})}
                />
                <TextInput
                style={{borderWidth:1, borderColor: 'black', marginBottom: 15, height: 50, width: 200}}
                    placeholder={this.state.cardColor}
                    onChangeText={(colorText) => this.setState({cardColor: colorText})}
                />
                <Button
                    title='clickToPost'
                    onPress={() => postJson()}
                />  
            </View>
        )
    }
} 

