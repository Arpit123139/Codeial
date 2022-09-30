{    
    //method to submit the form data for new Post using ajax 
    let createPost=function(){

        let newPostForm=$('#new-post-form')

        newPostForm.submit(function(e){
            e.preventDefault();       // It will prevent the default method of submission of post and would not redirecr
            
            $.ajax({       // this ajax make the request in form of xhr which is handled by the post_controller 
                type:'post',        // what type of request grt or post 
                url:'/posts/create',
                data:newPostForm.serialize(), // this convert the form data into json and the json data from the post_controller return here
                success:function(data){
                    console.log(data)

                    let newPost=newPostDom(data.data.post);
                    $('#post-list-container>ul').prepend(newPost)

                },error:function(error){
                    console.log(error.responseText)
                }
            })
        })
    }

    //method to create a post in DOM

    let newPostDom=function(post){

        return $(` <li id="post-${post._id}">
        <p>
            <!--Use the .id instead of ._id in locals.user.id to convert it into String -->
            
                
                <small>
                    <a class="delete-post-button" href="/posts/destroy/${post.id}">X</a>
                </small>
                
                    ${post.content}
                        <br>
                        <small>
                            ${post.user.name}
                        </small>
        </p>
        <div class="post-comments">
            
    
                <form action="/comments/create" method="Post">
                    <input type="text" name="content"
                        placeholder="Type Here to add comment">
                    <input type="hidden" name="post" value="${post._id}">
                   
                    <input type="submit" value="Add Comment">
                </form>
    
                
    
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
        </div>
    
    </li>`)

    }



    createPost();
}