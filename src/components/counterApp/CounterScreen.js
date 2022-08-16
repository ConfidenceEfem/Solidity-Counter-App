import React from 'react'
import styled from "styled-components"
import { ethers,utils } from 'ethers'
import ContractAbi from "./CounterAbi"

const CounterScreen = () => {
    const [counter, setCounter] = React.useState(0)
    

    const contractAddress = "0xf2665aa62ED5e180a5a93099c2f6fCcC270Be757"

    const openWallet = async () => {
        try {
            if(window.ethereum){
                const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
                const account = accounts[0]
                console.log(account)
            }else{
                alert(`Please install Metamask`)
            }
        } catch (error) {
            alert(`${error}`)
        }
    }
    console.log(ContractAbi)

    const getCurrentCounter = async () => {
        try {
            if(window.ethereum){
                const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten")
                const signerD = provider.getSigner()
                const CounterContract = new ethers.Contract(
                    contractAddress,
                    ContractAbi,
                    signerD
                )

                const myCounter = await CounterContract.getCounter()
                console.log(myCounter, utils.formatEther(myCounter), myCounter.toNumber())
                const mainCounter = myCounter.toNumber()
                setCounter(mainCounter)

            }else{
                alert(`Please install Metamask`)
            }
        } catch (error) {
            alert(`${error}`)
        }
    }

    const incrementCounter = async () => {
        try {
            if(window.ethereum){
               
                const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten")
                const signerD = provider.getSigner()
                const CounterContract = new ethers.Contract(contractAddress,ContractAbi,signerD)
                
                const counterIncrease = await CounterContract.incrementCounter()
                if(counterIncrease){
                    getCurrentCounter()
                                }

            }else{
                alert(`Please install Metamask`)
            }
        } catch (error) {
            alert(`${error}`)

        }
    }

    const DecreaseCounter =async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten")
            const signerD = provider.getSigner()
            const Contract = new ethers.Contract(contractAddress,ContractAbi,signerD)

            const SubtractMe = await Contract.decrementCounter()
            if(SubtractMe){
getCurrentCounter()
            }

            
        } catch (error) {
            alert(`${error}`)
        }
    }
    const ResetCounter =async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "ropsten")
            const signerD = provider.getSigner()
            const Contract = new ethers.Contract(contractAddress,ContractAbi,signerD)

            const resetMe = await Contract.resetCounter()
            console.log(resetMe)
if(resetMe){
     getCurrentCounter()
}
           
        } catch (error) {
            alert(`${error}`)
        }
    }

    React.useEffect(()=>{
        openWallet()
        getCurrentCounter()


    },[counter,DecreaseCounter,incrementCounter])
  return (
    <Container>
        <Title>Counter App With Solidity</Title>
        <Counter>{counter}</Counter>
        <CounterComp>
            <Button bg="whitesmoke" cl="red" onClick={DecreaseCounter}>Subtract</Button>
            <Button bg="red" cl="whitesmoke" onClick={getCurrentCounter}>Current Counter</Button>
            <Button bg="red" cl="whitesmoke" onClick={ResetCounter}>Reset</Button>
            <Button bg="whitesmoke" cl="red" onClick={incrementCounter}>Add</Button>
        </CounterComp>
    </Container>
  )
}

export default CounterScreen

const Button = styled.div`
background-color: ${({bg})=>bg};
color: ${({cl})=>cl};
margin: 0 5px;
width: 150px;
height: 50px;
display:flex;
justify-content: center;
align-items: center;
font-weight: 600;
transition: all 660ms;
:hover{
    transform: scale(1.02);
    cursor: pointer;
}

`
const CounterComp = styled.div`
display:flex;
`
const Counter = styled.div`
margin: 50px 0;
font-size: 40px;
color: white;
font-weight: 500;
`
const Title = styled.div`
font-size: 25px;
color: whitesmoke;
text-transform: uppercase;
font-weight: 600;
margin-top: 60px;
margin-bottom: 100px;

`
const Container = styled.div`
width: 100%;
height: 100vh;
background-color: black;
display:flex;
flex-direction:column;
align-items: center;
`