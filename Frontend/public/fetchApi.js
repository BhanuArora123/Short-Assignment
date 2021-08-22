class Fetching{
    constructor(url,method,body=undefined){
        this.url = url;
        this.method = method;
        this.body=body;
    }
    async fetchData(){
        let res = await fetch(this.url,{
            method:this.method,
            body:JSON.stringify(this.body),
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data = await res.json();
        return data;
    }
}