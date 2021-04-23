import React, {Component} from 'react';
import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import Button from './components/Button';
import Display from './components/Display';


const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0, 
}


export default class App extends Component {

  state = {...initialState}

  addDigit = n => {
    

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay; //para tirar o 0 da tela ao digitar algum numero
    
    if(n === '.' && !clearDisplay && this.state.displayValue.includes('.')){   //nao pode inserir mais de um ponto se nao for limpar o display
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue; //para nao adicionar varios zeros de inicio
    const displayValue = currentValue + n; //concatenar os numeros digitados
    this.setState({displayValue, clearDisplay: false});

    if(n !== '.'){
      const newValue = parseFloat(displayValue); //pegando o valor do display
      const values = [...this.state.values]; //criando um novo array para depois substituir
      values[this.state.current] = newValue; //setando o valor no array
      this.setState({values}); //substituindo no array base
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => { 
    if(this.state.current === 0) {
      this.setState({operation, current: 1, clearDisplay: true}) //armazena a operacao, aponta para o proximo index do array e limpa o display ao digitar outro numero, depois da operacao

    }else {
      const equals = operation === '=';
      const values = [...this.state.values];

      try{
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`); //eval avalia e resolve a expressao, com a operacao ja armazenada antes
      } catch (e){
        values[0] = this.state.values[0];
      }
    

    values[1] = 0;
    this.setState({
      displayValue: `${values[0]}`,  //exibindo o resultado parcial. interpolacao para este valor sempre ser uma string
      operation: equals ? null : operation, //se a operacao for '=' nao armazena, senao, armazena para a proxima conta
      current: equals ? 0 : 1, //se clicar no '=', o proximo digito sera armazenado no indice 0 do array, senao vai sendo aramazenado no indice 1 
      clearDisplay: true, // o display depois de exibir o resultado
      values, //atualizando o array 
      })
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.imageDisplay} source={require('./image/seta.jpeg')}>
          <Display value={this.state.displayValue}/>
        </ImageBackground>
        <View style={styles.buttons}>

        <ImageBackground style={styles.imageTriple} source={require('./image/fundo22.png')}>
          <Button label='AC'  triple onClick={this.clearMemory}/>  
        </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/div.jpeg')}>
            <Button label='' operation onClick={() => this.setOperation('/')}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/fundo.png')}>
            <Button label='7'  onClick={() => this.addDigit(7)}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/fundo.png')}>
            <Button label='8'  onClick={() => this.addDigit(8)}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/fundo.png')}>
            <Button label='9'  onClick={() => this.addDigit(9)}/> 
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/mult.jpeg')}>     
            <Button label='' operation onClick={() => this.setOperation('*')}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/fundo.png')}> 
            <Button label='4'  onClick={() => this.addDigit(4)}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/fundo.png')}>
            <Button label='5'  onClick={() => this.addDigit(5)}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/fundo.png')}>
            <Button label='6'  onClick={() => this.addDigit(6)}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/sub.jpeg')}>
            <Button label='' operation onClick={() => this.setOperation('-')}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/fundo.png')}>
            <Button label='1'  onClick={() => this.addDigit(1)}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/fundo.png')}>
            <Button label='2'  onClick={() => this.addDigit(2)}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/fundo.png')}>
            <Button label='3'  onClick={() => this.addDigit(3)}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/add.jpeg')}>
            <Button label='' operation onClick={() => this.setOperation('+')}/>
          </ImageBackground>

          <ImageBackground style={styles.imageDouble} source={require('./image/fundo.png')}>
            <Button label='0'  double onClick={() => this.addDigit(0)}/>
          </ImageBackground>

          <ImageBackground style={styles.image} source={require('./image/fundo.png')}>
          <Button label='.'  onClick={() => this.addDigit('.')}/>
          </ImageBackground>
          
          <ImageBackground style={styles.image} source={require('./image/igual.jpeg')}>
            <Button label='' operation onClick={() => this.setOperation('=')}/> 
          </ImageBackground> 
         
          
        </View>      

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    
    resizeMode: "cover",
    height: Dimensions.get('window').width/4,
    width: Dimensions.get('window').width/4,
    
  },
  imageDouble: {  
    width: (Dimensions.get('window').width/4)*2,
  },
  imageTriple: {
    width: (Dimensions.get('window').width/4)*3,
  },
  imageDisplay: {
    flex: 1,
    padding: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
  }
});
