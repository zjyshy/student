
(function IIFE(){

    var dbStudentId;
    var loginStudentId = document.getElementsByClassName("login_studentId");
    var loginPassword = document.getElementsByClassName("login_password");
    var loginName = document.getElementsByClassName("login_name");
    var loginRepeatPassword = document.getElementsByClassName("login_repeatPassword") 
    var loginEnter = document.getElementsByClassName("login_enter");
    var signinDe = document.getElementsByClassName("signin_De");
    var loginReturn = document.getElementsByClassName("login_return");
    var errorHint = document.getElementsByClassName("error_hint");
    var BSignin = document.getElementsByClassName("BSignin");
    var show = document.getElementsByClassName("show");
    var welcome = document.getElementsByClassName("welcome");
    var LL = document.getElementsByClassName("left-list"); 
    var setSMIn = document.getElementsByClassName("setSMIn");
    var setSMC = document.getElementsByClassName("setSMConfirm");
    var cancelSM = document.getElementsByClassName("cancelSM");
    var signinStudentId = document.getElementsByClassName("signin_studentId");
    var signinPassword = document.getElementsByClassName("signin_password");
    var longinSuccess = document.getElementsByClassName("login_success");
    var signinSystem = document.getElementsByClassName("signin_system");
    var mainSystem = document.getElementsByClassName("main_system");
    var showDate = document.getElementsByClassName("date");
    var mainSystemName = document.getElementsByClassName("main_system_name");
    var loginId ;
    var ooo;
    var qqq;
    var flag = 0;
    var method = {
        add:function(newItem){
            //var transaction = db.transaction(dbName, "readwrite");
            // 打开已经存储的数据对象
            //var objectStore = transaction.objectStore(dbName);
            // 添加到数据对象中
            //var objectStoreRequest = objectStore.add(newItem);    
            //可以不用向上面那么麻烦,直接写成
            db.transaction(dbName,"readwrite").objectStore(dbName).add(newItem);
        },
        /*
        del:function(id){
            
            db.transaction(dbName,"readwrite").objectStore(dbName).delete(id);

        },*/

        edit:function(id,data){
            var transaction = db.transaction([dbName], "readwrite");
            // 打开已经存储的数据对象
            var objectStore = transaction.objectStore(dbName);
            // 获取存储的对应键的存储对象
            var objectStoreRequest = objectStore.get(id);

            objectStoreRequest.onsuccess = function(event){
                //当前数据
                var myRecord = objectStoreRequest.result;
            for (let key in data){
                if(typeof myRecord[key] != 'undefined'){
                        myRecord[key] = data[key];
                }
            }
            objectStore.put(myRecord);
            }

        },

       /*   get:function(a,b){
        
        var request =  db.transaction(dbName).objectStore(dbName).index(a).get(b);
        request.onsuccess = function(event){
           var showName = event.target.result.password;
           
           console.log(showName);
            return showName;
        }


        },*/

    };
        var dbName = "student";  
        var version = 1;
        var db;
        var DBOpenRequest = window.indexedDB.open(dbName,version);
        DBOpenRequest.onerror = function(event){
            console.log("数据库打开失败");
        }
        DBOpenRequest.onsuccess = function(event){
            console.log("数据库打开成功");
            db = DBOpenRequest.result;

        }
        DBOpenRequest.onupgradeneeded = function(event) {
            var db = event.target.result;
            
            db.onerror = function(event) {
                logError('数据库打开失败');
            };
        
            // 创建一个数据库存储对象
            var objectStore = db.createObjectStore(dbName, { 
                keyPath: 'id',
                autoIncrement: true
            });
        
            // 定义存储对象的数据项
            objectStore.createIndex('id', 'id', {
                unique: true    
            });
            objectStore.createIndex('studentId', 'studentId');
            objectStore.createIndex('password', 'password');
            objectStore.createIndex('gender','gender');
            objectStore.createIndex('major','major');
            objectStore.createIndex('class','class');
            objectStore.createIndex('section','section');   
            objectStore.createIndex('name','name');  
        
        };

 
    function addLoadEvent(func){

		var oldonload = window.onload;
		if(typeof window.onload != "function"){
			window.onload = func;


		}else{

			window.onload = function(){

				oldonload();
				func();
			};
		}
	}

    function showLogin(){
        var ALP = document.getElementsByClassName("appear_login_page");
        var login = document.getElementById("login_page");
        var signin  = document.getElementById("signin_page");
        ALP[0].onclick = function(){
            
          
           login.style = "opacity:1";
            signin.style = "display:none";
            signinStudentId[0].value = "";
            signinPassword[0].value = "";
            return false;
          
        }
        loginReturn[0].onclick = function(){
            login.style = "display:none;";
            signin.style = "display:block";
           
        }

    }


 function testPassword(){
     //测试注册内容
    var login = document.getElementById("login_page");
    var signin  = document.getElementById("signin_page");
   
    loginEnter[0].addEventListener("click",function(){
        var objectStore = db.transaction(dbName).objectStore(dbName);
        if(isNaN(loginStudentId[0].value) || loginStudentId[0].value == ""){
            loginPassword[0].value = "";
            loginRepeatPassword[0].value = "";
            loginStudentId[0].value = "";
            loginName[0].value = "";
            errorHint[0].childNodes[0].nodeValue = "你的学号有问题哦"
            errorHint[0].style = " opacity:1";
            setTimeout(function(){
                testIsNaN[0].style = "opacity:0";

            },3000)

            
        }else if(loginName[0].value == ""){
            loginPassword[0].value = "";
            loginRepeatPassword[0].value = "";
            loginStudentId[0].value = "";
            loginName[0].value = "";
            errorHint[0].style = "opacity:1";
            errorHint[0].childNodes[0].nodeValue ="请你输入你的名字哦";
            setTimeout(function(){
                errorHint[0].style = "opacity:0";

            },3000)




        }else if(loginPassword[0].value != loginRepeatPassword[0].value || loginPassword[0].value == ""){
            loginPassword[0].value = "";
            loginRepeatPassword[0].value = "";
            loginStudentId[0].value = "";
            loginName[0].value = "";
            errorHint[0].style = "opacity:1";
            errorHint[0].childNodes[0].nodeValue ="你的密码有问题哟";
            setTimeout(function(){
                errorHint[0].style = "opacity:0";

            },3000)


        }else{
            var m = 0;
            var objectStore = db.transaction(dbName).objectStore(dbName);
            objectStore.openCursor().onsuccess = function(event){

                var cursor = event.target.result;
               if(cursor){
                cursor.continue();
                if(cursor.value.studentId == loginStudentId[0].value){
                    m++;

                }
               }else{
                if(!m){
                    
                    var obj = {
                        studentId:loginStudentId[0].value,
                        password:loginPassword[0].value,
                        name:loginName[0].value,
                        section:"",
                        gender:"",
                        major:"",
                        class:""


                    };
                        method.add(obj);
                        longinSuccess[0].style = "display:block;";
                        login.style = "display:none;"
                        loginPassword[0].value = "";
                        loginRepeatPassword[0].value = "";
                        loginStudentId[0].value = "";
                        loginName[0].value = "";
                       
                        setTimeout(function(){
                            longinSuccess[0].style = "display:none;";
                            signin.style = "display:block"
                        },3000)
                    
                }else{
                    loginPassword[0].value = "";
                    loginRepeatPassword[0].value = "";
                    loginStudentId[0].value = "";
                    loginName[0].value = "";
                    errorHint[0].style = "opacity:1";
                    errorHint[0].childNodes[0].nodeValue ="你已经注册过了";
                    setTimeout(function(){
                        errorHint[0].style = "opacity:0";
        
                    },3000)

                }

               }  
            }
        }
    })
   
 }


 function testSignin(){

    BSignin[0].addEventListener("click",function(){
   
       
      
        var objectStore = db.transaction(dbName).objectStore(dbName);
        objectStore.openCursor().onsuccess = function(event) {
            var cursor = event.target.result;
            
            
            if (cursor) {
                // cursor.value就是数据对象
                // 游标没有遍历完，继续
                cursor.continue();
                 if(cursor.value.studentId == signinStudentId[0].value){
                    //如果数据库中有相同的学号,就说明已经注册过了,也就是i>1 
                   ooo = cursor.value.password;
                   qqq = cursor.value.id;
                    ++flag;
                    dbStudentId = cursor.value.studentId;
                    
                 }
              
                 


               // if(cursor.value.studentId == signinStudentId[0].value && cursor.value.password == signinPassword[0].value){
                   //密码和账号输入正确后

                //}
             
            }else{
               
                if(signinPassword[0].value == ooo){
                 
                    signinSystem[0].style = "display:none";
                    mainSystem[0].style = "display:block";
                    showStudentDate(qqq);
                    

                }else if( signinStudentId[0].value == ""){
                    signinDe[0].childNodes[0].nodeValue = "还没输入学号呢";
                    setTimeout(function(){
                        signinDe[0].childNodes[0].nodeValue = " ";
                    },3000)

                }else if(signinPassword[0].value == "" ){
                    signinDe[0].childNodes[0].nodeValue = "还没输入密码呢";
                    setTimeout(function(){
                        signinDe[0].childNodes[0].nodeValue = " ";
                    },3000)
                
                }
                else if(flag ==0 && signinPassword[0].value != ""){
                    signinDe[0].childNodes[0].nodeValue = "你还没有注册呢";
                    setTimeout(function(){
                        signinDe[0].childNodes[0].nodeValue = " ";
                    },3000)
                }else{
                    
                    signinDe[0].childNodes[0].nodeValue = "密码错误";
                    setTimeout(function(){
                        signinDe[0].childNodes[0].nodeValue = " ";
                    },3000)
                }
            } 
                }

               

             
    })

 }
    function date(){

        var d=new Date()
        showDate[0].childNodes[0].nodeValue = "今天是:"+(d.getMonth()+1+"月") + (d.getDate()+"日") ;
        console.log("现在是:"+(d.getMonth()+1+"月"));
    }


    function clickLL(){

        for(let i = 0; i < 2; i++){

            LL[i].addEventListener("click", function(){
                for(let j = 0; j < 2;j++){

                    if(i == j){
                        show[i].style = "display:block";
                        welcome[0].style = "display:none";
                        LL[i].style = "background-color:#555; border-radius:10px;";
                    }else{
                        show[j].style = "display:none";
                        LL[j].style = "background-color:transparent;";
                    }
                }

            })
        }
    }

function showStudentDate(id){
    var transaction = db.transaction([dbName], "readwrite");
    // 打开已经存储的数据对象
    var objectStore = transaction.objectStore(dbName);
    // 获取存储的对应键的存储对象
    var objectStoreRequest = objectStore.get(id);
    objectStoreRequest.onsuccess = function(event){
       var signinShow = objectStoreRequest.result;
       mainSystemName[0].childNodes[0].nodeValue = signinShow.name;
       var test  = document.getElementsByClassName('test');
       test[0].innerHTML = "<th>"+signinShow.studentId+"</th><th>"+signinShow.name+"</th>  <th>"+signinShow.gender+"</th>  <th>"+signinShow.section+"</th> <th>"+signinShow.major+"</th><th>"+signinShow.class+"</th>"
    }
    

}


function showSM(){
    LL[0].addEventListener("click",function(){

        showStudentDate(qqq);
    })
    


}

function setSM(){
    
   
    setSMC[0].addEventListener("click",function(){
        var transaction = db.transaction([dbName], "readwrite");
        // 打开已经存储的数据对象
        var objectStore = transaction.objectStore(dbName);
        // 获取存储的对应键的存储对象
        var objectStoreRequest = objectStore.get(qqq);
        objectStoreRequest.onsuccess = function(event){
           var signinShow = objectStoreRequest.result;
          
         }
       
    var setSMDate = {
        section:setSMIn[0].value ,
        major:setSMIn[1].value,
        class:setSMIn[2].value,
        gender:setSMIn[3].value

    }
    console.log(setSMDate);
    method.edit(qqq,setSMDate);
    


})
    
cancelSM[0].addEventListener("click",function(){
    var transaction = db.transaction([dbName], "readwrite");
    // 打开已经存储的数据对象
    var objectStore = transaction.objectStore(dbName);
    // 获取存储的对应键的存储对象
    var objectStoreRequest = objectStore.get(qqq);
    objectStoreRequest.onsuccess = function(event){
       var signinShow = objectStoreRequest.result;
       setSMIn[0].value = signinShow.section;
       setSMIn[1].value = signinShow.major;
       setSMIn[2].value = signinShow.class;
       setSMIn[3].value = signinShow.gender;
     }


})

LL[1].addEventListener("click",function(){

   
        var transaction = db.transaction([dbName], "readwrite");
        // 打开已经存储的数据对象
        var objectStore = transaction.objectStore(dbName);
        // 获取存储的对应键的存储对象
        var objectStoreRequest = objectStore.get(qqq);
        objectStoreRequest.onsuccess = function(event){
           var signinShow = objectStoreRequest.result;
           setSMIn[0].value = signinShow.section;
           setSMIn[1].value = signinShow.major;
           setSMIn[2].value = signinShow.class;
           setSMIn[3].value = signinShow.gender;
         }
       
    


})


}



    function main(){
        showLogin();
        testPassword();
        testSignin();
        clickLL();
        date();
        showSM();
        setSM();
        

       
    }
    addLoadEvent(main);
}
)()