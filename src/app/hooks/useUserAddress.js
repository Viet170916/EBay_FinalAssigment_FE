const useUserAddress=async()=>{
    let address = {};
    let response = await fetch("/api/address/get")

    if(response){
        let data = await response.json();
        console.log('GETRequest:Address' , data);
        if(data){
            address = data;
        }
    }
    return address;
}

export default useUserAddress;