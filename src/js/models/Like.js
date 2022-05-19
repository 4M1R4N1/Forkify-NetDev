export default class Like{
    constructor(){
        this.likes = [];
    }

    addLike(id, title, author, img){
        const like = { id, title, author, img };
        this.likes.push(like);
        
        this.persistData();
        
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);

        this.likes.splice(index, 1); 
        
        this.persistData();
    }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    persistData(){
        localStorage.setItem('like', JSON.stringify(this.likes));
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('like'));
        if(storage) this.likes = storage;
    }

    getLikeNum(){
        return this.likes.length;
    }

}