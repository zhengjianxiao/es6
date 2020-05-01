var that;
class Tab {
    constructor(id){
       that = this;
       this.man = document.getElementById(id);
       this.ul = this.man.querySelector("ul");
       this.content= this.man.querySelector(".content");
       this.adds = this.man.querySelector(".add");
       this.init();
    }
    init(){
        this.updatenode();
        for(var i = 0 ; i < this.lis.length ; i++){
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggle;
            this.removes[i].onclick = this.remove;
            this.spans[i].ondblclick = this.update;
            this.sections[i].ondblclick = this.update;
        }
        this.adds.onclick = this.add;
        
    }
    updatenode(){
        this.lis = this.man.querySelectorAll("li");
        this.sections =this.man.querySelectorAll("section");
        this.removes = this.man.querySelectorAll("i");
        this.spans = this.man.querySelectorAll(".menu span:first-child");
    }
    removeclass(){
        for(var i = 0 ; i < this.lis.length ; i++){
            this.lis[i].className = "";
            this.sections[i].className = "";
        }
    }
    toggle(){
        that.removeclass();
        this.className = "down"; 
        that.sections[this.index].className = "vis";
    }
    add(){
        var random = Math.random();
        that.removeclass();
        var li = '<li class="down"><span>新测试</span><i>-</i></li>';
        var section = ' <section class="vis">新测试'+ random + '</section>';
        that.ul.insertAdjacentHTML("beforeend" ,li);
        that.content.insertAdjacentHTML("beforeend" ,section);
        that.init();
        // var li = document.createElement("li");
        // li.innerHTML = "新测试<i>-</i>";
        // that.ul.appendChild(li);
    }
    remove(e){
           e.stopPropagation();
           var index = this.parentNode.index;
           this.parentNode.remove();
           that.sections[index].remove();
           that.init();
           if(that.man.querySelector(".down")) return;
           index--;
        //    if(index < 0){
        //     index++;
        // }
        that.lis[index] && that.lis[index].click();
           
    }
    update(){
        window.getSelection ? window.getSelection().removeAllRanges() :document.selection.empty();
        var str = this.innerHTML;
        this.innerHTML ='<input type="text" />';
        var input = this.firstChild;
        input.value = str;
        input.select();
        input.onblur = function (){
            this.parentNode.innerHTML =this.value;
        }
        input.onkeyup = function(e){
            if(e.keyCode === 13){
                this.blur();
            }
        }
    }
    
}
new Tab('tab');