const {MongoClient}=require('mongodb')
const uri='mongodb://localhost:27017';
const client=new MongoClient(uri);
const dbName = 'plp_bookstore';
const collectionName = 'books';

const books= async()=>{
    await client.connect();
    console.log("Connected");
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    // // FIND BY GENRE SPECIFIC
    const byGenre= await collection.find({ genre: 'Fiction' }).toArray();
    console.log("Returned Successflly",byGenre);

    // PUBLISHED AFTER A CERTAIN YEAR
    const byYear=await collection.find({published_year:{$gt:1930}}).toArray();
    console.log('Published after 1930:\n',byYear);

    // FINDING BOOKS BY A CERTAIN AUTHOR
    const byAuthor=await collection.find({author:'Harper Lee'}).toArray();
    console.log('Published by Harper Lee:\n',byAuthor);

    // UPDATING A BOOK BY PRICE
    await collection.updateOne({price:10.99}, [{$set:{price:13.00,title:"Shamba la Wanyama"}}]);
    console.log('Updated one book')

    // DELETING BY ITS TITLE
    await collection.deleteOne({title:'Shamba la Wanyama'})
    console.log('Deleted one book')

    // FINDING BOTH IN STORE AND PUBLISHED AFTER 2010
    const storeYear=await collection.find({in_stock:true,published_year:{$gt:2010}}).toArray();
    console.log("Both in stock and after 2010:\n",storeYear);

    // PROJECTION TO RETURN(TITLE, AUTHOR, PRICE)
    const booksProject=await collection.aggregate([{$project:{title:1,author:1,price:1,_id:0}}]).toArray();
    console.log('Books returned:',booksProject);

    // DISPLAYING BOOKS BY PRICE AND SORTING TO ASCENDING AND DESCENDING
    const sortDesc=await collection.aggregate([{$project:{title:1,price:1,_id:0}},{$sort:{price:-1}}]).toArray();
    console.log('Sorted books:\n',sortDesc);

    // ASCENDING 
    const sortAsc=await collection.aggregate([{$project:{title:1,price:1,_id:0}},{$sort:{price:1}}]).toArray();
    console.log('Sorted books:\n',sortAsc);

    // PAGINATION(LIMITING)
    const booksLimit=await collection.find({}).limit(5).toArray();
    console.log('Books Returned:',booksLimit);
    
    // PAGINATION(LIMITING AND SKIPPING)
    const booksPaginate=await collection.find({}).skip(5).limit(5).toArray();
    console.log('Books Returned:',booksPaginate);

    // CALCULATING AVERAGE PRICE OF BOOK BY GENRE
    const bookPrice= await collection.aggregate([{$group:{_id:'$genre',averageprice:{$avg:'$price'}}}]).toArray();
    console.log('Average Price:',bookPrice);

    // AUTHOR WITH MOST BOOKS IN COLLECTION
    const topAuthor= await collection.aggregate([{$group:{_id:"$author",totalBooks:{$sum:1}}},{$sort:{totalBooks:-1}}]).toArray();
    console.log('Top author',topAuthor);

    // GROUP BOOKS BY PUBLICATION AND COUNTING THEM
    const booksPublish = await collection.aggregate([{$group: {_id: {$subtract: [{ $toInt: "$published_year" },{ $mod: [{ $toInt: "$published_year" }, 10]}]},totalCount:{ $sum:1}}},{ $sort: { totalCount:-1}}]).toArray();
    console.log('Books by publication decade:\n', booksPublish);

    // CREATING AN INDEX ON TITLE
    const titleIndex=await collection.createIndex({title:1});
    console.log("Index created:\n",titleIndex);

    // COMPOUND INDEX AUTHOR AND PUBLISHED YEAR
    const authorPublished=await collection.createIndex({author: 1, published_year: -1});
    console.log("Index created:\n",authorPublished);

    // TESTING PERFOMANCE OF MY INDEXES
    const queryExplain = await collection.find({ author: "Harper Lee" }).explain("executionStats");
    console.log(JSON.stringify(queryExplain, null, 2));

    await client.close();

};

books();
