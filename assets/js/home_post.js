{    
    //method to submit the form data for new Post using ajax 
    let createPost=function(){

        let newPostForm=$('#new-post-form')

        newPostForm.submit(function(e){
            e.preventDefault();       // It will prevent the default method of submission of post and would not redirecr
            
            $.ajax({       // this ajax make the request in form of xhr which is handled by the post_controller 
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(), // this convert the form data into json and the json data from the post_controller return here
                success:function(dataReturn){
                    console.log(dataReturn)

                },error:function(error){
                    console.log(error.responseText)
                }
            })
        })
    }

    createPost();
}