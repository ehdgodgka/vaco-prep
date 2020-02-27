var arr=[-1, 2, 3, -9, 11];//[1,-2,3,4,-9,6]
function getMaxSubSum(arr){
//0번 인덱스부터 더하기 시작 최고값갱신
//1번 인덱스부터 더하기 최고값갱신 ...
//2번 인덱스부터...
//3번 인덱스부터 ... 
var max=0;
var sum=0;
for(var start=0;start<arr.length;start++){
    sum=0;
for(var now =start ; now < arr.length ; now++ ){
    sum+=arr[now];
    if(sum>max){
        max=sum;
    }
}

}
console.log(max);
}
getMaxSubSum(arr);