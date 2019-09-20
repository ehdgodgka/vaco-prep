// 공백 입력 전까지 입력 받은 수를 다 더해서 출력해주는 함수
function sumInput(){
    var storage=[];
    do{
        var input;
        input=prompt("give me number // want to finish? type nothing",0);
        var input_to_num=parseInt(input);
        console.log(input_to_num);
        if(!isNaN(input_to_num)){
            storage.push(input_to_num);
        }
    }while(!isNaN(input_to_num));

    
    const sum=storage.reduce((acc,curr)=>{
        return acc+curr;
    });
    alert(sum);
}
sumInput();