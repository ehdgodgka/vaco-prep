/*title: Check the login 
설명 : logical 연산자와 if 문 연습하는 예제 
- prompt 입력을 받는다 
    -Admin 이면 비밀번호를 입력 받고 
    -Cancel 이면 prompt 창을 닫고 
    -Other 이면 Wrong password 띄우기 
*/
function start(){
    var who=prompt("who are you?");
    if(who.toUpperCase()==="ADMIN"){
    var password=prompt("password?");
    if(password==="TheMaster"){
        alert('welcome');
    } else{
        alert('wrong password');
    }
    } else{
        alert('cancled');

    }
}


const button=document.querySelector('#demo');
button.addEventListener('click',start);