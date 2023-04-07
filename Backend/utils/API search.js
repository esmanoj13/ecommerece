class Apisearch{
    constructor(query,querystr){
        this.query=query,
        this.querystr=querystr
    }
    search(){
        const keyword=this.querystr.keyword?{
            name:{
                // These are the mongoodb serach regular expression
                $regex:this.querystr.keyword,
                $options:"i"
            }
        }:{}
        console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){
        const querycopy={...this.querystr};
        console.log( querycopy);
        const removefield=["keyword","page","filter"];
        removefield.forEach((key)=>delete querycopy[key]);
        this.query=this.query.find(querycopy);
        // this is used to make the page filter
        let queryStr=JSON.stringify(querycopy);
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/,(key)=>`$$(key)`);
        this.query=this.query.find(JSON.parse(queryStr));
        
        return this;
    }
    pagination(resultperpage){
          const currentpage= Number(this.querystr.page) || 1;
          // This is imprtant to show the product which skip the above project means suppose we have choose page=3 then 
          //if we have 10 product in per page then we skip 20 product so below logic we remove 20 products.

          const skip = resultperpage * (currentpage-1);
          this.query = this.query.limit(resultperpage).skip(skip);
          return this;
    }
}
module.exports=Apisearch;