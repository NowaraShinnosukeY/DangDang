var suggest_j=-1,tempArr=[],keytempArr=[],tempSize=10,tempLast,allwordsview='',suggest_div_width,search_input_id,sugTO,sugTO2,sugIsDown=false,sugX,sugY,tempSearchkey,suggest_tag=false;
var strdomainshopcart="http://shopping.dangdang.com";
var newdomainshopcart="http://shopping.dangdang.com";
var urlref = "#ddclick_search_searchinput";
var city_list = Array("��������","����","�Ϻ�","����","����","���","�ɶ�","�人","����","�Ͼ�","����","����");
var is_input = false;
var sug_gid=function(node){
  return document.getElementById(node);
}
var sug_gname=function(node){
  return sug_gid("suggest_key").getElementsByTagName(node);
}
var doc_prev_referer= null;
var doc_referer= null;
var ddclick_page_tracker;
window.onload = function() {
    if(ddclick_page_tracker){
      doc_prev_referer = ddclick_page_tracker .__dd_referrer;
      doc_referer = ddclick_page_tracker .__dd_url;
    }
};

function Suggest_Initialize(id,width,x,y)
{
    search_input_id = id;
    if(sug_gid(search_input_id))
    {
       if(getOs()==2){
           sug_gid(search_input_id).oninput = keyup;
       }else{
           sug_gid(search_input_id).onkeyup = keyup;
       }
       sug_gid(search_input_id).onkeydown = keydown;
       sug_gid(search_input_id).onpaste = onpaste_search;
       sug_gid(search_input_id).autocomplete = "off";
       //document.onclick =hide_suggest;
       if(!document.addEventListener){
           document.attachEvent("onclick",hide_suggest);
       }else{
           document.addEventListener("click",hide_suggest,false);
       }
       window.onresize=suggest_keywords_view;
       suggest_div_width = width;
       sugX=(x=="undefined"||x==""?0:x);
       sugY=(y=="undefined"||y==""?0:y);
    }
    //Create_Suggest_Div();
}

function Create_Suggest_Div()
{
    document.write('<div id="suggest_key" class="suggest_key" style="z-index: 10000; top: 158px; left: 400px;display:none;" ></div>');
}

function header_trim(str)
{
 return str.replace(/(\s*$)|(^\s*)/g, '');
}

function getkeyword()
{

    var objfrm=document.searchform;
    var selectguan="";
    var permid=getCookie_one("__permanent_id");
    if(objfrm.catalog.value!=""){
        if(objfrm.catalog.value>4000000){
            selectguan=objfrm.catalog.value;
        }else{
            selectguan="";
        }
    }
  if(sugTO2) clearTimeout(sugTO2);
//  if(escape(sug_gid(search_input_id).value)==""){
//            hide_suggest();
//    }else{
      var tempI=tempCheck(sug_gid(search_input_id).value+objfrm.catalog.value);
      if(tempI==-1){
                tempSearchkey=(sug_gid(search_input_id).value);
                var myurl="";
                if(objfrm.catalog.value==selectguan){
                     myurl= newsuggesturl+"keyword="+(header_trim(sug_gid(search_input_id).value))+"&pid="+permid+"&hw=1&hwps=12&catalog=" + "&guanid=" + selectguan + "&"+Math.random();
                 }else{
                     if(selectguan==""){
                         if(objfrm.catalog.value>4000000){
                            myurl=newsuggesturl+"keyword="+(header_trim(sug_gid(search_input_id).value))+"&pid="+permid+"&hw=1&hwps=12&catalog="+ "&guanid=" + objfrm.catalog.value +  "&"+Math.random();
                         }else{
                            myurl=newsuggesturl+"keyword="+(header_trim(sug_gid(search_input_id).value))+"&pid="+permid+"&hw=1&hwps=12&catalog="+ objfrm.catalog.value +"&guanid=" +   "&"+Math.random();
                         }
                     }else{
                        myurl=newsuggesturl+"keyword="+(header_trim(sug_gid(search_input_id).value))+"&pid="+permid+"&hw=1&hwps=12&catalog="+ objfrm.catalog.value + "&guanid=" +  "&"+Math.random();
                     }
                 }
                invokeServer(myurl);
                viewkeywords(tempI);
                sugIsDown=false;
        }else if(tempI==-2){
             hide_suggest();
        }else if(tempLast!=sug_gid(search_input_id).value || sug_gid("suggest_key").innerHTML=="" ){
            tempSearchkey=unescape(keytempArr[tempI][1]);
            //sug_gid("suggest_key").innerHTML = tempArr[tempI][1] ;
            sug_gid("suggest_key").innerHTML = FillSuggest(tempArr[tempI][1]) ;
            viewkeywords(tempI);
            sugIsDown=false;
        }
  // }
   if(sugIsDown) {
        tempLast=sug_gid(search_input_id).value;
        sugTO2=window.setTimeout(getkeyword,3000);
   }
}
var title_showtext = "",showtext  = "",showvalue="",title_onekey = "",class_name="",onekey,b = 0,suggesttype,history_words;
function FillSuggest(jsondata){
    if(jsondata=="") return  "" ;
    var objfrm  =  document.searchform;
    var isShowClass = false ;
    if(objfrm.catalog.value=="") isShowClass = true ;
    var result_html = "";
    var first_html = "";
    var search_showtext = "";
    var other_showtext = "";
    var click_event="";
    var tuihuo_image="";
    var huodaofukuan_image="";
    var search_key_length = sug_gid(search_input_id).value.length;
    var childdata,childs ,product_key = [],search_key = [],class_key = [],all_keys = [];
    var newdata = [],data2,data3,data4,data5,data6,data7,data8,data9,data10,listcontent="",star_level=0,author="",publish="";
    var result_li="";
    var i = 0, p = 0,u = 0,m = 0;
    var word_dispaly="";
    var show = "block";
    var result_product="";
    var history_html = '';
    var x=0,d=0,n=0,num=0;

    if(jsondata[2] && jsondata[2].length>0){
          childdata = jsondata[2] ;
          childs = jsondata[2].length ;
          for(p = 0;p<childs;p++){
             for(showtext in childdata[p]){
                 if(p == 0){
                    product_key.push(showtext) ;
                 }else{
                    search_key.push(showtext);
                 }
             }
          }
    }
    if(jsondata[1]&& jsondata[1].length>0){
          childdata = jsondata[1] ;
          childs = jsondata[1].length ;
          for(u=0;u< childs ;u++){
              if(childdata[u][3]=="1") {
                  class_key.push(childdata[u][1]+"&"+childdata[u][2]);
              }else{
                  class_key.push(childdata[u][1]+"&"+childdata[u][0]);
              }
          }
    }
    all_keys.push(product_key,class_key,search_key);
    if(jsondata[3] && jsondata[3].length>0){
        var jsondata_3 = jsondata[3];
        history_words = jsondata[3];
        var k = 0;
        for(var x=0;x<jsondata_3.length;x++){
            var list_html = list_content(jsondata_3,x,all_keys,search_key_length,1,x);
            if(jsondata[0]&& jsondata[0].length>0||jsondata[2] && jsondata[2].length>0){
                if(x>1){
                    word_dispaly = ' style="display:none";';
                    show = "none";
                }
            }
            result_li+= '<li dd_name=\'������ʷ\' show='+show+word_dispaly+' id="li_'+x+'" type="search" value="' +x+ '" onclick=\'form_submit("","'+title_showtext+'",'+x+',"","searchhistory")\' onmouseover="mo(this.value);overchangedata('+x+','+suggesttype+')" onmouseout="ou(this.value);outchangedata('+x+','+suggesttype+')"><span class="d" id="hist_'+x+'">������ʷ</span><div id="key_'+x+'" '+class_name+'><span class="del" onclick=\'stop_propation(event);delete_history_word('+x+',"'+title_showtext+'");\' id="span_'+x+'" style="display:none;">ɾ��</span><div class="isdiv" title="'+title_showtext+'">'+title_showtext+'</div></div>'+list_html+'</li>';
            title_showtext = "",showtext  = "",showvalue="",title_onekey = "",class_name="",onekey,b = 0,suggesttype=0;
            k++;
            if(x>=11)break;
        }
        history_html =  '<ul id="search_history_ul" class="search_history">'+result_li+'</ul>';
    }
    
    if(jsondata[0]&& jsondata[0].length>0){
          childdata = jsondata[0] ;
          childs = jsondata[0].length ;
          for(i=0;i<childs;i++){
               for (showtext in childdata[i]){
                 showvalue = childdata[i][showtext] ;
               }
               result_product+="<li type=\"product\" value=\"" +i+"\" onclick=\"goto_product('"+showvalue+"')\" onmouseover=\"mo(this.value)\">" +showtext+"</li>";;
               i++;
          }
         if(result_product!="")
            result_product='<ul class="select_key_item" id="__suggest_product">'+result_product+'</ul>';
    }

    var result_class  = "";
    if(isShowClass){ 
        if(jsondata[1]&& jsondata[1].length>0){
            if(k>0){
                d = k+jsondata[1].length-1;
                if(jsondata[1].length==1){
                    d = k+jsondata[1].length;
                }
            }else if(jsondata[2] && jsondata[2].length>0){
                d=1;
            }
            childdata = jsondata[1] ;
            childs = jsondata[1].length ;
            for(var j=0;j< childs ;j++){
                result_class+="<li type=\"class\" id=\"li_"+d+"\" value=\"" +d+ "\" onclick=\"goto_class('"+childdata[j][0]+"','"+childdata[j][2]+"','#topkeys#',"+d+",'"+all_keys+"','searchinput')\" onmouseover=\"mo(this.value)\"><span></span>��<strong>"+childdata[j][1]+"</strong>����</li>";
                d++;
            }
            result_class='<div class="clear"></div><ul class="select_key_sort" id="__suggest_class_keyword">'+result_class+'</ul>';
        }
    }
    if(k>0){
        num = k;
        i = k;
        if(jsondata[1]&& jsondata[1].length>0){
                i = d;
        }        
    }else if(jsondata[1]&& jsondata[1].length>0){
        i = d;
    }
    m=13-jsondata[1].length-1;
    if(jsondata[2] && jsondata[2].length>0){
          childdata = jsondata[2] ;
          childs = jsondata[2].length ;
          for(var k=0 ;k< childs ;k++){
            var listhtml = list_content(childdata,k,all_keys,search_key_length,n,i);
            if(n===0){
                listhtml = list_content(childdata,k,all_keys,search_key_length,n,num);
            }
            if(result_product==''&& n==0){
                if(result_class!=''){
                    result_html+= '';
                }else{
                    result_html+= '<li type="search" dd_name="�����Ƽ�"  id="li_'+b+'" value="' +b+ '" onclick=\'form_submit("","'+title_showtext+'",'+b+',"'+all_keys+'","searchinput")\' onmouseover="mo(this.value);overchangedata('+b+','+suggesttype+')" onmouseout="outchangedata('+b+','+suggesttype+')"><span class="d">Լ' +showvalue+'�����</span><div id="key_'+b+'" '+class_name+'><div title="'+title_showtext+'">'+showtext+'</div></div>'+listhtml+'</li>';
                    i++;
                }
            }else{
                result_html+= '<li type="search" dd_name="�����Ƽ�"  id="li_'+b+'" value="' +b+ '" onclick=\'form_submit("","'+title_showtext+'",'+b+',"'+all_keys+'","searchinput")\' onmouseover="mo(this.value);overchangedata('+b+','+suggesttype+')" onmouseout="outchangedata('+b+','+suggesttype+')"><span class="d">Լ' +showvalue+'�����</span><div id="key_'+b+'" '+class_name+'><div title="'+title_showtext+'">'+showtext+'</div></div>'+listhtml+'</li>';
                i++;
            }
            if(n==0){
                first_html = '<ul id="__suggest_one_class_keyword"><li type="search" id="li_'+num+'" value="'+num+'" onclick=\'form_submit("","'+title_showtext+'",'+num+',"'+all_keys+'","searchinput")\' onmouseover="mo(this.value);overchangedata('+num+','+suggesttype+')" onmouseout="outchangedata('+num+','+suggesttype+')"><div id="key_'+num+'" '+class_name+'><div title="'+title_onekey+'">'+onekey+'</div></div>'+listhtml+'</li></ul>'+result_class.replace(/#topkeys#/g,title_onekey);
            }
            //listcontent="";listhtml="";class_name="";publish="";author="";click_event="";tuihuo_image="";huodaofukuan_image="";
            title_showtext = "",showtext  = "",showvalue="",title_onekey = "",class_name="",onekey,b = 0,suggesttype=0;
            n++; 
            if(k>=m) break;
          }
    }

    if(result_html!=""||history_html!="") {
            var result_top = "" ;
            if(result_product!='')
                result_top=result_product;
            else {
                if(result_class!=''){
                    //result_top='<ul id=\"__suggest_one_class_keyword\"><li type=\"search\" value=\"0\" onclick=\"form_submit(\'\',\''+onekey+'\','+0+',\''+all_keys+'\','+dd_type+')\" onmouseover=\"mo(this.value)\"><span></span>'+onekey+'</li></ul>'+result_class.replace(/#topkeys#/g,onekey);
                    result_top = first_html;
                }
            }
            result_html= history_html+result_top+"<ul id=\"__suggest_keyword\" >"+result_html+"</ul>";
    }
    return result_html ;
}
//ɾ��������ʷ��
function delete_history_word(word_id,word){
    var num = 0;
    if(sug_gid("search_history_ul")!=undefined){
        var history_data = sug_gid("search_history_ul").getElementsByTagName("li");
        var history_data_len = sug_gid("search_history_ul").getElementsByTagName("li").length;
    }
    //���ص�ǰword_id����ʷ�ʼ�ɾ����������ʶΪdelete��ʾ�Ѿ���ɾ�������߼�ɾ����
    if(sug_gid("li_"+word_id)!=undefined){
        sug_gid("li_"+word_id).style.display="none";
        sug_gid("li_"+word_id).setAttribute('show','delete');
    }
    if(sug_gid("span_"+word_id)!=undefined){
        sug_gid("span_"+word_id).style.display="none";
    }
    //����ɾ��
    var perm_id = getCookie_one("__permanent_id","");
    var delete_url = newsuggesturl+"type=del_word&key="+word+"&perm_id="+perm_id;
    create_script(delete_url);
    for(var i=0;i<history_data_len;i++){ 
        var word_node=history_data[i];
        if(word_node!=undefined){
            if(word_node.getAttribute("value")==word_id && word_node.getAttribute("show")!="delete"){
                sug_gid("search_history_ul").removeChild(sug_gid("search_history_ul").childNodes[i]);
                break;
            }    
        }
    }   
    //��ǰҳ�滺����Ƽ�����ɾ��
    for(i=0;i<tempArr.length;i++){
        if(tempArr[i][1][3]!=undefined&&tempArr[i][1][3].length>0){
            var data = tempArr[i][1][3];
            for(j=0;j<data.length;j++){
                for(record in data[j]){
                    if(escape(word)==escape(record)){
                        data.splice(j,1);
                    }
                }
            }
        }
    }
//    for(var i=0;i<history_data_len;i++){
//        if(history_data[i].getAttribute("show")=="none"){
//            num++;//��ʶû��ɾ����������ʷ�ʵ�������
//        }
//    }
    if(num<1){//�������<1�����»�ȡ��������
        //if(sugTO) clearTimeout(sugTO);
        //sugTO = setTimeout(getkeyword,50);//   sugIsDown=true;       
    }  
    //�油������ʷ�ʣ���Ȼ����ʷ�ʱ�ɾ��ʱ�������Ƿ���δ��ɾ������ʷ�ʣ��������չʾ������ʶΪ�Ѿ�չʾ��
    for(var i=0;i<history_data_len;i++){ 
        var word_node=history_data[i];
        if(word_node!=undefined){
            if(word_node.getAttribute("value")!=word_id && word_node.getAttribute("show")=="none"){
                word_node.style.display="block";
                word_node.setAttribute('show','block');
                break;
            }    
        }
    }     
}
//��Ʒ��ר��͵���ֱ���ʵ�ַ������Ѽ��ʺ���ʷ�ʹ��ô˺�����
function list_content(childdata,k,all_keys,search_key_length,n,i){
    var search_showtext = "";
    var other_showtext = "";
    var click_event="";
    var tuihuo_image="";
    var huodaofukuan_image="";
    var listhtml = "";
    var newdata = [],data2,data3,data4,data5,data6,data7,data8,data9,data10,listcontent="",star_level=0,author="",publish="";
    for(showtext in childdata[k]){
        newdata = childdata[k][showtext].split(",");
        showvalue = newdata[0] ;//����
        suggesttype = newdata[1];//0:û��,1:����,2:��Ʒ,3:ר��
        data2 = newdata[2];//bookid,shopid,activename
        data3 = newdata[3];//bookname,shopname,activecategory
        data4 = newdata[4];//bookauthor,shopcity,activeurl
        data5 = newdata[5];//bookpublish,shoppic,
        data6 = newdata[6];//bookprice,shopurl,
        data7 = newdata[7];//ddprice,shopdesnum
        data8 = newdata[8];//bookappraise
        data9 = newdata[9];//bookpic
        data10 = newdata[10];//bookurl
    }
    if(suggesttype!=0){class_name = 'class="arrow"';}
    title_showtext = showtext;
    search_showtext = showtext.substr(0,search_key_length);
    if(search_showtext == sug_gid(search_input_id).value){
        other_showtext = showtext.substr(search_key_length,showtext.length);
        showtext = "<strong>"+search_showtext+"</strong>"+other_showtext;
    }
    if(n==0){title_onekey=title_showtext;onekey= showtext ;b = i;}else{b = i;}
    if(header_trim(suggesttype)!="" && suggesttype == 1){
        click_event = 'onclick=\'stop_propation(event);goto_suggest_url("","'+title_showtext+'",'+b+',"'+all_keys+'",'+suggesttype+',"'+data6+urlref+'","searchinput")\'';
        tuihuo_image = 'http://img4.ddimg.cn/header/header2012/key_icon_01.png';
        huodaofukuan_image = "http://img4.ddimg.cn/header/header2012/key_icon_02.png";
        listcontent = '<div class="content"><div><p><span class="t">���ڵأ�</span>'+data4+'</p><p><span class="t">�����ϣ�</span><span class=\"serve_t\"><img src="'+tuihuo_image+'" alt="">�����˻�</span><span class="serve_t"><img src="'+huodaofukuan_image+'" alt="">��������</span></p><p class="button"><a href="javascript:void(0);" class="btn" '+click_event+'>�������</a></p></div></div>';
        listhtml = '<div class="select_pop" id="keyword_'+b+'" style="display:none;"><p class="name"><a href="javascript:void(0);" title="'+data3+'"  '+click_event+'>'+data3+'</a></p><a class="pic" href="javascript:void(0);" title="'+data3+'" '+click_event+'><img src="'+data5+'"></a>'+listcontent+'</div>';
    }
    if(header_trim(suggesttype)!="" && suggesttype == 2){
        star_level = data8*10;
        if(header_trim(data4)!="" && data4 != undefined){
            author = '<p class="h-limit" title="'+data4+'">'+data4+'</p>';
        }
        if(header_trim(data5)!="" && data5 != undefined){
            publish = '<p class="h-limit" title="'+data5+'">'+data5+'</p>';
        }
        var minsize=1210;
        var screensize=screen.width;
        if (width==1 && narrow==0 && screensize>=minsize){
            data9 = data9.replace(/\_t/g,"_m");
        }
        click_event = 'onclick=\'stop_propation(event);goto_suggest_url("","'+title_showtext+'",'+b+',"'+all_keys+'",'+suggesttype+',"'+data10+urlref+'","searchinput")\'';
        listcontent = '<div class="content"><div class="star"><span class="level" style="width:'+star_level+'%;"></span></div>'+author+publish+'<p class="button"><a href="javascript:void(0);" class="btn" '+click_event+'>�鿴��Ʒ����</a></p></div>';
        listhtml = '<div class="select_pop" id="keyword_'+b+'" style="display:none;"><p class="name"><a href="javascript:void(0);" title="'+data3+'" '+click_event+'>'+data3+'</a></p><a class="pic" href="javascript:void(0);" title="'+data3+'" '+click_event+'><img src="'+data9+'"></a>'+listcontent+'</div>';
    }
    if(header_trim(suggesttype)!="" && suggesttype == 3){
        click_event = 'onclick=\'stop_propation(event);goto_suggest_url("","'+title_showtext+'",'+b+',"'+all_keys+'",'+suggesttype+',"'+data4+urlref+'","searchinput")\'';
        listcontent = '<div class="content"><p class="button"><a href="javascript:void(0);" class="btn" '+click_event+'>����ר��</a></p></div>';
        listhtml = '<div class="select_pop" id="keyword_'+b+'" style="display:none;"><p class="name"><a href="javascript:void(0);" title="'+data2+'" '+click_event+'>'+data2+'</a></p><span class="t">Ʒ�ࣺ</span>'+data3+'</p>'+listcontent+'</div>';
    } 
    return listhtml;
}
function tempFill(n,v){
    if(tempArr.length>=tempSize) tempArr.shift();
    tempArr.push([escape(n),v])
}

function keytempFill(n,v){
    if(keytempArr.length>=tempSize) keytempArr.shift();
    keytempArr.push([escape(n),escape(v)])
}
function tempCheck(n){
    for(var i=0;i<tempArr.length;i++) {
        var t0=unescape(tempArr[i][0]),t1=tempArr[i][1];
        if(t0==n){
            return i;
        }else if(t1=="" && n.indexOf(t0)==0 && n.length>t0.length){
            return -2;
        }
    }
    return -1;
}

function invokeServer(url)
{
     var scriptOld=document.getElementById('temp_script');
     if(scriptOld!=null && document.all)
     {
        scriptOld.src = url;
        return;
     }
    var head=document.documentElement.firstChild,script=document.createElement('script');
    script.id='temp_script';
    script.type = 'text/javascript';
    script.src = url;
    if(scriptOld!=null)
       head.replaceChild(script,scriptOld);
    else
       head.appendChild(script);
}

function viewkeywords(shownum)
{
    var x=getposOffset_top(sug_gid(search_input_id),'left');
    var y=getposOffset_top(sug_gid(search_input_id),'top');
    var div_obj=sug_gid("suggest_key");
    //if(isIE_c())
       // div_obj.style.left=(x+sugX-1)+'px';
    //else
       // div_obj.style.left=(x+sugX)+'px';
    //div_obj.style.top=(y+sugY-3)+'px';
    if(shownum>-1){
        div_obj.style.display="inline";
    }
    
}

function suggest_keywords_view(){
     if(sug_gid("suggest_key").style.display=="none")return;
     viewkeywords(-1);
}

function set_style(){

  for(var i=0;i<sug_gname("li").length;i++){
    var li_node=sug_gname("li")[i];
    li_node.className="";
  }
  if(suggest_j>-1 && suggest_j<=sug_gname("li").length){
        if(sug_gid("li_"+suggest_j)!=undefined){
            sug_gid("li_"+suggest_j).className="select_key";
            //sug_gname("li")[suggest_j].className="select_key";
            //sug_gname("li")[suggest_j].style.width=suggest_div_width+"px";
        }
    }
}

function mo(nodevalue,id){
    suggest_j=nodevalue;
    set_style(suggest_j);
    if(sug_gid("hist_"+nodevalue)!=undefined && sug_gid("span_"+nodevalue)!=undefined){//��ʷ�ʺ�Ĭ��չʾ��������ʷ����ֻ�е���긡��ʱ��ʾ��ɾ����
        sug_gid("hist_"+nodevalue).style.display="none";
        sug_gid("span_"+nodevalue).style.display="block";        
    }
}
//��ʷ�ʺ�Ĭ��չʾ��������ʷ����ֻ�е���긡��ʱ��ʾ��ɾ������������뿪ʱ������ʾ��������ʷ����
function ou(nodevalue){
    if(sug_gid("hist_"+nodevalue)!=undefined && sug_gid("span_"+nodevalue)!=undefined){
        sug_gid("hist_"+nodevalue).style.display="block";
        sug_gid("span_"+nodevalue).style.display="none";
    }
}

function overchangedata(id,type){
    if(type!='keybord'){
        if(sug_gid("key_"+id)!= undefined){
            if(type!="" && type!=0){
                sug_gid("key_"+id).className="arrow2";
            }else{
                sug_gid("key_"+id).className="";
            }
        }
    }else{
        if(sug_gid("keyword_"+id)!= undefined){
           sug_gid("key_"+id).className="arrow";
        }
    }
    if(sug_gid("keyword_"+id)!= undefined){
        sug_gid("keyword_"+id).style.display="block";
        left_height = sug_gid("keyword_"+id).clientHeight;
        right_height = sug_gid("suggest_key").clientHeight;
        if(left_height>right_height){
            sug_gid("suggest_key").style.height = left_height+"px";
        }else{
            sug_gid("keyword_"+id).style.height = (right_height-5)+"px";
        }
    }else{
        sug_gid("suggest_key").style.height = "";
    }
}

function outchangedata(id,type){
    if(type!='keybord'){
        if(sug_gid("key_"+id)!= undefined){
            if(type!="" && type!=0){
                sug_gid("key_"+id).className="arrow";
            }else{
                sug_gid("key_"+id).className="";
            }
        }
        if(sug_gid("keyword_"+id)!= undefined){
            sug_gid("keyword_"+id).style.display="none";
            sug_gid("suggest_key").style.height = "";
        }
    }else{
        if(sug_gid("keyword_"+id)!= undefined){
           sug_gid("keyword_"+id).style.display="none";
           sug_gid("key_"+id).className="arrow";
        }
    }
    if(sug_gname("li")[id]!=undefined){
        sug_gname("li")[id].className="";
    }
}

function stop_propation(evt){
    var e=(evt)?evt:window.event;
    if (window.event) {
        e.cancelBubble=true;
    } else {
        //e.preventDefault();
        e.stopPropagation();
    }
}
function form_submit(classstr,key,pos,allkeys,act){
    head_search_data(act,classstr,key,pos,allkeys);
    if(suggest_j>=0 && suggest_j<sug_gname("li").length){
        if(sug_gname("li")[suggest_j].getAttribute("type")=="search"){
            if(sug_gid("key_"+suggest_j)!= undefined&&sug_gid("key_"+suggest_j).childNodes[0]!=undefined){
                if(sug_gid("key_"+suggest_j).childNodes[0].title!=""){
                    sug_gid(search_input_id).value = sug_gid("key_"+suggest_j).childNodes[0].title;
                }
            }
            if(sug_gid("key_"+suggest_j)!= undefined&&sug_gid("key_"+suggest_j).childNodes[1]!=undefined){
                if(sug_gid("key_"+suggest_j).childNodes[1].title!=""){
                    sug_gid(search_input_id).value = sug_gid("key_"+suggest_j).childNodes[1].title;
                }
            }            
        }    
    }
    sug_gid('suggest_searchkey_btn').click();
}
function goto_suggest_url(classstr,key,pos,allkeys,suggesttype,suggesturl,act){
    head_search_data(act,classstr,key,pos,allkeys,suggesttype,suggesturl);
    window.open(suggesturl);
}
function goto_class(category_path_data,category_id_data,key,pos,allkeys,act){

    sug_gid('suggest_class_btn').click();
    head_search_data(act,category_id_data,key,pos,allkeys);

    category_id_arr=category_path_data.split(".");
    var category_id_set = Array("01","03","05","07","08","10","51","98");
    if(category_id_set.indexOf(category_id_arr[0])>-1){
        location.href="http://search.dangdang.com/?key=" + key + "&category_path=" + category_path_data + "&SearchFromTop=1&ref=suggest-1-1&act=input";
        return ;
    }else{
        location.href="http://search.dangdang.com/?key=" + key + "&category_id="+category_id_data + "&ref=suggest-1-1&act=input";
        return ;
    }
}

function goto_product(product_id){

     sug_gid('suggest_product_btn').click();
     var obj = document.createElement('a');
     obj.href   = "http://product.dangdang.com/product.aspx?product_id="+product_id+"&ref=suggest-1-0";
     window.open(obj.href);
}

function head_search_data(act,classstr,key,pos,allkeys,suggesttype,suggesturl){
    //var act = "searchinput";
    var selectkey = key;
    var cat = "";
    var keyinput = sug_gid(search_input_id).value;
    var pos = pos;
    var keys = allkeys;
    if(classstr != ""){
        cat = classstr;
    }
    if(suggesttype==undefined){suggesttype="";}
    if(suggesturl==undefined){suggesturl="";}
    searchdata_to_search(act,selectkey,cat,keyinput,pos,keys,suggesttype,suggesturl);
    return true;
}
//act=searchinput
//key=ѡ�еĹؼ���
//keyinput=�û�����Ĺؼ���
//cat=����ţ�ѡ�еĹؼ�������Ƿ���Ļ�������Ϊ�գ�
//pos=ѡ�еĹؼ���λ�ã�����1��10��
//keys=��ʾ�ؼ���1#cat||������ʾ�ؼ���10#cat��catΪ����ţ�
function searchdata_to_search(act,key,cat,keyinput,pos,keys,suggesttype,suggesturl,ref,rcount,type){
    if(document.images){
        ref = typeof ref == 'undefined' ? '' : ref;
        rcount = typeof rcount == 'undefined' ? '' : rcount;
        type = typeof type == 'undefined' ? '' : type;
        var t=new Date().getTime();
        var custid=getCookie_one("customerid","dangdang");
        var permid=getCookie_one("__permanent_id");
        var url = "/ping.php?act="+act+"&pos="+pos+"&cat="+cat+"&key="+key+"&keyinput="+keyinput+"&keys='"+keys+"'&suggesttype="+suggesttype+"&suggesturl='"+encodeURI(suggesturl)+"'&custid="+custid+"&permid="+permid+"&url="+ref+"&rcount="+rcount+"&type="+type+"&t="+t;
        if(typeof(PageTracker)=="function"){
            var page_tracker =new PageTracker();
            if(typeof(page_tracker.trackPingPHP)=="function"){
                page_tracker.trackPingPHP("http://search.dangdang.com"+url);
            }      
        }

    }
    return true;
}

function hide_suggest(){
    if(suggest_tag==true){suggest_tag = false;return;}
    var nodes=document.body.childNodes ;
    for(var i=0;i<nodes.length;i++){
        if(nodes[i]!=sug_gid(search_input_id))
            suggest_j=-1;
            sug_gid("suggest_key").style.display="none";
    }
}
//���й�һ�����벢�ҽ��������������ʱ�ɾ����������ʷ����չʾ��
function history_display(){
    sugTO = setTimeout(getkeyword,50);
//    var is_have_li = false;
//    if(sug_gid("search_history_ul")){
//        var search_history_li_len = sug_gid("search_history_ul").getElementsByTagName("li").length;
//        var search_history_li = sug_gid("search_history_ul").getElementsByTagName("li");    
//        for(i=0;i<4;i++){//����������ʷģ���⣬����ģ�鶼ɾ��
//            if(i>0&&sug_gname("ul")[i]!=undefined){
//                var all = sug_gid(sug_gname("ul")[i].id).childNodes;
//                var child_num = all.length
//                sug_gname("ul")[i].style.display="none";
//                for(j=0;j<child_num;j++){
//                    sug_gid(sug_gname("ul")[i].id).removeChild(all[all.length-1]);
//                }
//            }
//        }
//        for(j=0;j<search_history_li_len;j++){
//            if(search_history_li[j].getAttribute("show")=="none"){
//                search_history_li[j].style.display="block";//������������ʷ��
//            }
//            if(search_history_li[j].getAttribute("show")!="delete"){
//                is_have_li = true;//��û��ɾ����������ʷ��
//            }        
//        }   
//        //���������ʷ�ʶ�ɾ���˲�չʾ������
//        if(is_have_li==true){
//            sug_gid("suggest_key").style.display="inline";
//        }else{
//            sug_gid("suggest_key").style.display="none";
//        }
//    }
}

function keyup(e)
{
    var objfrm=document.searchform;
    var keyc;
  if(window.event){
        keyc=event.keyCode;
    }else if(e.which){
        keyc=e.which;
    }
    if(keyc==27){
        hide_suggest();
        document.getElementById('label_key').innerHTML= objfrm.default_key.value;
        return;
    }
    if(keyc!=40&&keyc!=38){
        if(sugTO) clearTimeout(sugTO);
        if(escape(header_trim(sug_gid(search_input_id).value))!=""){
            sug_gid("label_key").style.visibility="hidden";
            sugTO = setTimeout(getkeyword,50);
            sugIsDown=true;
        }else{
            hide_suggest(2);
            document.getElementById('label_key').innerHTML= objfrm.default_key.value;
            sug_gid("label_key").style.visibility="visible";
        }
        is_input = true;//��ʶ�������Ƿ��й�һ������
    }
    if(keyc==8&&is_input==true&&escape(header_trim(sug_gid(search_input_id).value))==""){
        history_display(); //�й�һ�����벢�ҵ��ɾ����������������û�������ʣ���չʾ������������ʷ��       
    }
}

function onpaste_search(){
    sug_gid("label_key").style.visibility="hidden";
    sugTO = setTimeout(getkeyword,50);
}
function check_none_li(type){
    if(sug_gid("key_"+suggest_j)){
        if(type=="down"){
            if(sug_gid("key_"+suggest_j).parentNode.style.display=="none"){
                suggest_j++;check_none_li("down");
            }
        }
        if(type=="up"){
            if(sug_gid("key_"+suggest_j).parentNode.style.display=="none"){
                suggest_j--;check_none_li("up");
            }
        }
    }
}
function keydown(e){
  var keyc;
  if(window.event){
            keyc=event.keyCode;
    }else if(e.which){
            keyc=e.which;
    }
  if(keyc==40 || keyc==38){
        if(sug_gid("suggest_key").style.display=="none")return;
        if(keyc==40){
            if(suggest_j<sug_gname("li").length){
                suggest_j++;check_none_li("down");
                if(suggest_j>=sug_gname("li").length) {
                    suggest_j=-1;
                    sug_gid(search_input_id).value=tempSearchkey;
                }
            }else{
                suggest_j=0;
            }
            if(suggest_j>=sug_gname("li").length) suggest_j=-1;
        }
        if(keyc==38){
            if(suggest_j>=0){
                suggest_j--;check_none_li("up");
                if(suggest_j<=-1) {
                    suggest_j=sug_gname("li").length;
                    sug_gid(search_input_id).value=tempSearchkey;
                }
            }else{
                suggest_j=sug_gname("li").length-1;
            }
        }
        set_style(suggest_j);
        if(suggest_j>=0 && suggest_j<sug_gname("li").length){
            if(sug_gname("li")[suggest_j].getAttribute("type")=="search"){
                if(sug_gid("key_"+suggest_j)!= undefined&&sug_gid("key_"+suggest_j).childNodes[0]!=undefined){
                    if(sug_gid("key_"+suggest_j).parentNode.parentNode.style.display!="none"){
                        sug_gid(search_input_id).value = sug_gid("key_"+suggest_j).childNodes[0].title;
                    }
                }
                if(sug_gid("key_"+suggest_j)!=undefined&&sug_gid("key_"+suggest_j).childNodes[1]!=undefined){
                    if(sug_gid("key_"+suggest_j).parentNode.style.display!="none"){
                        sug_gid(search_input_id).value = sug_gid("key_"+suggest_j).childNodes[1].title;
                    }           
                }
            }
            for(i=0;i<sug_gname("li").length;i++){
                if(suggest_j==i){
                    overchangedata(suggest_j,'keybord');
                }else{
                    outchangedata(i,'keybord');
                }
            }
         }else{
            //sug_gid(search_input_id).value=temp_str;
         }
         if(sug_gid(search_input_id).value==tempSearchkey){
             if(i>0){
                 if(sug_gid("keyword_"+(i-1))!=undefined){
                     sug_gid("keyword_"+(i-1)).style.display="none";
                     sug_gid("key_"+(i-1)).className="arrow";
                     sug_gid("suggest_key").style.height = "";
                 }
             }
         }
    }
}

function getposOffset_top(what, offsettype)
{
    var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
    var parentEl=what.offsetParent;
    while (parentEl!=null)
    {
        totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
         parentEl=parentEl.offsetParent;
    }
    return totaloffset;
}

function getCookie_one(name,type){
  var cookies=document.cookie.split(";")  ;
  var temp ;
  var find_name;
  if(type=="dangdang" || type=="ddoy" || type=="login"){
    if(type == "dangdang"){find_name = "dangdang.com=";}
    if(type == "ddoy"){find_name = "ddoy=";}
    if(type == "login"){find_name = "login.dangdang.com=";}
    var dangdangcookie="";
     for(i=0;i<cookies.length;i++){
        if(cookies[i].indexOf(find_name)>-1){
            dangdangcookie=cookies[i].split("&");
            for(x=0;x<dangdangcookie.length;x++){
                 temp = dangdangcookie[x].split("=")  ;
                 if(header_trim(temp[0])==name){
                     return unescape(temp[1]);
                 }
            }
        }
     }
  }else if(type=="login_comm"){
      for(j=0;j<cookies.length;j++){
          if(cookies[j].indexOf("login.dangdang.com=")>0){
              dangdangcookie=cookies[j].split(".ASPXAUTH=");
              return dangdangcookie[1];
          }
      }
  }else if(type=="getdest"){
      for(i=0;i<cookies.length;i++){
         if(cookies[i].indexOf("dangdang.com=")<0){
             temp = unescape(cookies[i].split("="));
             temp = temp.split(",");
             if(header_trim(temp[0])==name){
              tempnew = temp[1].split("=");
              tempnew = tempnew[2].split("&");
              return unescape(tempnew[0]);
             }
         }
     }
  }else if(type=="dang"){
      for(j=0;j<cookies.length;j++){
          if(cookies[j].indexOf("dangdang.com=")==1){
              if(name=="customerid"){
                dangdangcookie=cookies[j].split("customerid=");
              }
              if(name=="email"){
                dangdangcookie=cookies[j].split("email=");
              } 
              temp = dangdangcookie[1].split("&");
              return temp[0];
          }
      }
  }else{
       for(i=0;i<cookies.length;i++){
        if(cookies[i].indexOf("dangdang.com=")<0){
            temp = cookies[i].split("=")  ;
             if(header_trim(temp[0])==name){
                 return unescape(temp[1]);
             }
        }
      }
  }
  return "";
}

function PageTopLogIn(){
    location.href="https://login.dangdang.com/signin.aspx?returnurl="+escape(location.href);
}

function PageTopRegist(){
    location.href="https://login.dangdang.com/Register.aspx?returnurl="+escape(location.href);
}

//change_car_count
function change_car_count(cartCount){
    var cartItemsCount=Number(cartCount);
    if(isNaN(Number(cartItemsCount))){
        cart_Count = "0";
    }else{
        cart_Count = cartCount;
    }
    if(cart_Count!=null&&cart_Count.length>0&&cart_Count!="undefined")
    {
        var cic=document.getElementById("cart_items_count");
        if(cic!=''){
            if(cart_Count>99){cart_Count='99+';}
            cic.innerHTML= cart_Count;
        }
    }
}

function initHeaderOperate()
{
    var usernick=getCookie_one("show_name","dangdang");
    var aspxauth=getCookie_one(".ASPXAUTH","login");
    if(aspxauth == ""){
        aspxauth = getCookie_one(".ASPXAUTH","login_comm");
    }
    var marks="";
    var chakanlk="";
    //set_cookie_start
    var minsize = 1210;
    var screensize = screen.width;
    //width_screen
    if(screensize >= minsize){
        if(usernick.length>10){
            usernick=usernick.substr(0,10)+"��";
        }
        document.cookie = "ddscreen=2;Domain=dangdang.com";
    }
    //narrow_screen
    if(screensize < minsize){
        if(usernick.length>5){
            usernick=usernick.substr(0,5)+"��";
        }
        document.cookie = "ddscreen=1;Domain=dangdang.com";
    }
    if(typeof(nick_num)!= 'undefined'){
        if(nick_num==0){
            if(usernick.length>5){
                usernick=usernick.substr(0,5)+"��";
            }
        }
    }
    //set_cookie_end
    var validatedflag=getCookie_one("validatedflag","ddoy");
    if(validatedflag=="1")
        marks = "<a name=\"ddnav_verifymail\" href=\"https://login.dangdang.com/VerifyEmail.aspx\">(δ��֤)</a>";
    if (validatedflag == "2" || validatedflag == "3"){
        marks = "<a name=\"ddnav_verifymail\" href=\"https://login.dangdang.com/VerifyEmail.aspx\">(δ��֤)</a>";
    }
    if(aspxauth=='' || usernick ==''){
        xinshou = '<a dd_name="��¼" href="javascript:PageTopLogIn();" target="_self" rel="nofollow" class="login_link">��¼</a><a dd_name="��Ϊ��Ա" href="javascript:PageTopRegist();" target="_self" rel="nofollw">��Ϊ��Ա</a>';
        var CartCount=getCookie_one("cart_items_count","");
        if(CartCount==""){CartCount = "0";}
        change_car_count(CartCount);  
    }else{
        chakanlk = '<a href="javascript:PageTopSignOut();" target="_self">[�˳�]</a>';
        xinshou = "";
        var CartCount=getCookie_one("cart_items_count","");
        if(CartCount==""){CartCount = "0";}
        change_car_count(CartCount);
        //zhanneixin
        var customer_id = getCookie_one("customerid","dang");
        customer_id = encodeURIComponent(customer_id);
        var email = getCookie_one("email","dang");
        var perm_id = getCookie_one("__permanent_id","");
        var message_url = "http://message.dangdang.com/api/msg_count_api.php?customer_id="+customer_id+"&perm_id="+perm_id+"&data_type=jsonp&callback=message_data";
        var unpaid_url = "http://orderb.dangdang.com/queryunpaid?callback=Unpaid_Data";
        //create_script(message_url);
        create_script(unpaid_url);
        //document.write("<scr"+"ipt type=\"text/javascript\" src=\""+message_url+"\"></s"+"cript>");
    }
    var nkname=document.getElementById("nickname");
    if(usernick!='' && aspxauth!=''){
        userlink = '<a href="http://myhome.dangdang.com/" class="login_link" target="_blank"><b>'+usernick+'</b></a>';
        nkname.innerHTML='<span class="hi">Hi��'+userlink+''+marks+chakanlk;
    }else if(usernick!=''){
        userlink = '<a href="http://myhome.dangdang.com" target="_blank" class="login_link"><b>'+usernick+'</b></a>';
        nkname.innerHTML='<span class="hi">Hi,'+userlink+'</span>��ӭ�ص�����&nbsp;'+xinshou;
    }else{
        nkname.innerHTML='��ӭ���ٵ�������'+xinshou;
    }
    city_num_put_cooke();
    var City_id = getCookie_one("city_id").split("_")[1];
    if(City_id!=undefined&&City_id!=null){
        var city_name = city_list[City_id];
        if(sug_gid('city_name')!=undefined){
            if(City_id==0){
                sug_gid('city_name').innerHTML = city_name;
            }else{
                sug_gid('city_name').innerHTML = city_name+"վ";
            }
        }
    } 
}
function create_script(src){
     var script = document.createElement('script');
     script.setAttribute('type','text/javascript');
     script.src = src;
     document.body.appendChild(script);
}
//header city
function city_num_put_cooke(data){
    var city_cnum,city_num = "111",city_li,city_li_len;
    var current_domain = window.location.hostname;
     if(current_domain=='globaldangdang.hk'){
      return false;
    }
    city_cnum = getCookie_one("dest_area","getdest");
    city_cnum = unescape(city_cnum);
    var is_hava_cookie=false;
    if(city_cnum!=""){
        city_num = city_cnum.split("&")[0];
        is_hava_cookie=true;
    }else{
        if(sug_gid("area_list")!=null || sug_gid("area_list")!=undefined){
            var get_city_url = newsuggesturl+"type=getnum";
            create_script(get_city_url);
        }
        if(data!=undefined){
            if(data["ReturnCode"]=="0"){
                city_num = data["LocInfo"]["Loc"][5];
            }
        }
    }
    if(sug_gid("area_list")!=null || sug_gid("area_list")!=undefined){
        city_li = sug_gid("area_list").getElementsByTagName("li");
        city_li_len = sug_gid("area_list").getElementsByTagName("li").length;
        for(i=0;i<city_li_len;i++){
            if(city_num == city_li[i].childNodes[0].getAttribute("num")) {
                if(!is_hava_cookie&&current_domain!='globaldangdang.hk'){
                  change_area(city_num,city_li[i].childNodes[0].innerHTML);
                }else{
                  sug_gid("curent_area").innerHTML = city_li[i].childNodes[0].innerHTML;
                }
                break;
            }
        }
    }
}
//zhanneixin
function message_data(data){
    var jytx_num=0,zhtx_num=0,fwtz_num=0,scjtx_num=0,sqxx_num=0;
    if(data["errorCode"]=="200"){
        if(header_trim(data["data"]["1"])!=undefined || header_trim(data["data"]["1"])!=""){
            jytx_num = data["data"]["1"];
        }
        if(header_trim(data["data"]["2"])!=undefined || header_trim(data["data"]["2"])!=""){
            zhtx_num = data["data"]["2"];
        }
        if(header_trim(data["data"]["3"])!=undefined || header_trim(data["data"]["3"])!=""){
            fwtz_num = data["data"]["3"];
        }
        if(header_trim(data["data"]["4"])!=undefined || header_trim(data["data"]["4"])!=""){
            scjtx_num = data["data"]["4"];
        }
        if(header_trim(data["data"]["5"])!=undefined || header_trim(data["data"]["5"])!=""){
            sqxx_num = data["data"]["5"];
        }
        if(parseInt(jytx_num)>=100){jytx_num = "99+";}
        if(parseInt(zhtx_num)>=100){zhtx_num = "99+";}
        if(parseInt(fwtz_num)>=100){fwtz_num = "99+";}
        if(parseInt(scjtx_num)>=100){scjtx_num = "99+";}
        if(parseInt(sqxx_num)>=100){sqxx_num = "99+";}
        var znx_sum = parseInt(jytx_num)+parseInt(zhtx_num)+parseInt(fwtz_num)+parseInt(scjtx_num)+parseInt(sqxx_num);
        if(znx_sum>=100){znx_sum = "99+";}
        var znx_count = '<a href="http://message.dangdang.com/mymessage.php#1" target="_blank" class="head_znx_a" id="znx_channel" onmouseover="showgaoji(\'znx_channel\',\'znx_items\');" onmouseout="hideotherchannel(\'znx_channel\',\'znx_items\');">վ����(<span>'+znx_sum+'</span>)</a>';
        var znx_jytx = '<li><a href="http://message.dangdang.com/mymessage.php#1" target="_blank">��������(<span>'+jytx_num+'</span>)</a></li>';
        var znx_zhtx = '<li><a href="http://message.dangdang.com/mymessage.php#2" target="_blank">�˻�����(<span>'+zhtx_num+'</span>)</a></li>';
        var znx_sqxx = '<li><a href="http://message.dangdang.com/mymessage.php#5" target="_blank">������Ϣ(<span>'+sqxx_num+'</span>)</a></li>';
        var znx_fwtz = '<li><a href="http://message.dangdang.com/mymessage.php#3" target="_blank">����֪ͨ(<span>'+fwtz_num+'</span>)</a></li>';
        var znx_scjtx = '<li><a href="http://message.dangdang.com/mymessage.php#4" target="_blank">�ղؼ�����(<span>'+scjtx_num+'</span>)</a></li>';
        var znx_item = znx_count+'<ul class="head_znx_list" id="znx_items" style="display: none;" onmouseover="showgaoji(\'znx_channel\',\'znx_items\');" onmouseout="hideotherchannel(\'znx_channel\',\'znx_items\');">'+znx_jytx+znx_zhtx+znx_sqxx+znx_fwtz+znx_scjtx+'</ul>';
        sug_gid('znx_content').innerHTML = znx_item;
        sug_gid('znx_content').style.display = "block";
    }
}
function Unpaid_Data(data){
    if(data["unpaid_num"]>0&&data["unpaid_num"]!=undefined){
        var num = '('+data["unpaid_num"]+')';
        if(data["unpaid_num"]>99){
            num = '(99+)';
        }
        if(sug_gid('unpaid_num')){
            sug_gid('unpaid_num').innerHTML = num;
        }
    }
}
// AddFavorite for dangdang
function AddFavorite(url,title){
    if(url==""){
        url = "http://www.dangdang.com";
    }
    if(title==""){
        title = "����?D���Ϲ������ģ�ͼ�顢ĸӤ����ױ���Ҿӡ����롢�ҵ硢��װ��Ь���ȣ���Ʒ�ͼۣ���������";
    }
        try{
        window.external.addFavorite(url, title);
        }catch (e){
            try{
                window.sidebar.addPanel(title, url, "");
            }catch (e){
                alert("��Ǹ�������������֧���Զ��ղ���ҳ����!\n����ʹ�ò˵�����Ctrl+D�ղر�վ��");
            }
        }
}

function PageTopSignOut(){
    location.href="https://login.dangdang.com/SignOut.aspx?returnurl="+escape(location.href);
}

//����div��ʾ
function showwindownewtop(obj,objdiv,addx,addy){

    var x=getposOffset(obj,'left');
    var y=getposOffset(obj,'top');
    var div_obj=document.getElementById(objdiv);
    div_obj.style.left=(x+addx)+'px';
    div_obj.style.top=(y+addy)+'px';
    if(div_obj.style.display=="none"){
    div_obj.style.display="inline";}
    else{
      div_obj.style.display="none";
    }
  }

function SignOut(){
    var ifru=document.getElementById("usernameifr");
    ifru.src="http://login.dangdang.com/SignOut.aspx?returnurl=http://www.dangdang.com/customer/signout.asp";
   changeuser();
}

function changeuser(){
var nkname=parent.document.getElementById("nickname");
nkname.innerHTML='���ã���ӭ���ٵ�����<a href="http://reco.dangdang.com/">����Ϊ���Ƽ���</a>[��<a href="http://login.dangdang.com/Signin.aspx" name="sign_in" target="_self" class="blue12a">��¼</a>/<a href="http://login.dangdang.com/Register.aspx" target="_self" name="Register" class="blue12a">ע��</a>]';
}

//--------------------header---------
//�������˵�
function showgaoji(aid,did){
    var obj = document.getElementById(aid);
    var divotherChannel=document.getElementById(did);
    if(aid!="znx_channel"){
        obj.className="menu_btn hover";
        divotherChannel.style.width="";
        var obj_width = obj.clientWidth;
        //divotherChannel.style.zIndex = 1000 ;
        divotherChannel.style.display = "block";
        var div_width = divotherChannel.clientWidth;
        if(obj_width > div_width){div_width = obj_width;}
        divotherChannel.style.width = div_width+"px";
    }else{
        obj.className="head_znx_a hover";
        divotherChannel.style.display = "block";
    }
}

function hideotherchannel(aid,did){
    var divotherChannel=document.getElementById(did);
    var mydd=document.getElementById(aid);
    if(divotherChannel.style.display!="none"){
        if(aid!="znx_channel"){
            divotherChannel.style.display="none";
            mydd.className="menu_btn";
        }else{
            mydd.className="head_znx_a";
            divotherChannel.style.display="none";
        }
    }
}

function allCategoryShow(){
   sug_gid('search_all_category').style.height = "286px";
   sug_gid('search_all_category').style.padding = "1px";
   sug_gid('search_all_category').style.borderWidth = "1px";
}
function allCategoryHide(){
   sug_gid('search_all_category').style.height = "0px";
   sug_gid('search_all_category').style.padding = "0px";
   sug_gid('search_all_category').style.borderWidth = "0px";
}
function selectCategory(val,obj){
    sug_gid('catalog_S').value=val ;
    sug_gid('search_all_category').style.height = "0px";
    sug_gid('search_all_category').style.padding = "0px";
    var text = obj.childNodes[0].innerHTML;
    sug_gid('Show_Category_Name').innerHTML=text;

}

function Category_Light(cid,type,event,obj){
    var cate_obj = sug_gid("cate_"+cid);
    var category_obj = sug_gid("category_"+cid);
    var checkobj=cate_obj;
    if(type==1){
        checkobj=category_obj;
    }
    if(isMouseLeaveOrEnter(event, checkobj)){
        if(typeof(cate_obj) == "object" && cate_obj != null){
            cate_obj.style.color="#FF6600";
            cate_obj.style.fontWeight="bold";
            if(typeof(category_obj) == "object" && category_obj != null){
                category_obj.className = "light";
            }
        }
    }

}
function Category_None(cid,type,event,obj){
    var cate_obj = sug_gid("cate_"+cid);
    var category_obj = sug_gid("category_"+cid);
    var checkobj=cate_obj;
    if(type==1){
        checkobj=category_obj;
    }
    if(isMouseLeaveOrEnter(event, checkobj)){
        if(typeof(cate_obj) == "object" && cate_obj != null ){
            cate_obj.style.color="";
            cate_obj.style.fontWeight="";
            if(typeof(category_obj) == "object" && category_obj != null){
                category_obj.className = "";
            }
        }
    }
}
function li_Out(id,type,index){
    if(type==0){
        if(sug_gid("weipin_li"+id)!=null){
            sug_gid("weipin_li"+id).className="";
        }
    }else{
        if(sug_gid("category_"+index+"_"+id)!=null){
            sug_gid("category_"+index+"_"+id).className="";
        }
    }
}
function li_On(id,type,index){
    if(type==0){
        if(sug_gid("weipin_li"+id)!=null){
            sug_gid("weipin_li"+id).className="on";
        }
    }else{
        if(sug_gid("category_"+index+"_"+id)!=null){
            sug_gid("category_"+index+"_"+id).className="light";
        }
    }
}

//-------------category start---------
var timecolsecategory;
var issettime=false ;
var menudataloaded = false;
var flag = 0;
var timeshowcategory;
var timeclosecategory;
function showCategory(aid,did,json_url){
    var divotherChannel=sug_gid(did);
    divotherChannel.style.height="511px";
    if(typeof(bw1)!= 'undefined'){
        window.clearInterval(bw1);
    }
    if(typeof(bw2)!= 'undefined'){
        window.clearInterval(bw2);
    }
    if(divotherChannel.style.display=="block"){

        return;
    }
    //if(isIE_c()){
        //sug_gid("nav_l").style.display = "block";
        //divotherChannel.style.display = "block";
   // }else{
        timeshowcategory=setTimeout(function(){
            sug_gid("nav_l").style.display = "block";
            divotherChannel.style.display = "block";
        },200);
   // }

    divotherChannel.style.overflow = "hidden";
    divotherChannel.style.height="1px";
    var changeW=function(){
          var obj_h=parseInt(divotherChannel.style.height);
          if(obj_h<=510){
            divotherChannel.style.height=parseInt(obj_h+Math.ceil((511-obj_h)/14))+"px";
          }else{
            divotherChannel.style.overflow = "";
            window.clearInterval(bw1);
          }
    }
    bw1= setInterval(changeW,1);
    if(flag>0){
     window.clearInterval(bw2);
    }
    if(!menudataloaded){
        loadCategoryJson(json_url);
    }
}
function closeCategory(did){
    timeclosecategory=setTimeout(function(){
        var divotherChannel=sug_gid(did);
        if(typeof(bw1)!= 'undefined'){
            window.clearInterval(bw1);
        }
        if(typeof(bw2)!= 'undefined'){
            window.clearInterval(bw2);
        }
        clearTimeout(timeshowcategory);
        divotherChannel.style.display = "none";
        sug_gid("nav_l").style.display = "none";
    },100);
}
function hiddenCategory(event,did){
    var obj=sug_gid(did);
    var obj2= sug_gid("a_category");
    var $menu =document.getElementById("menu_list");
    $menuitem=$menu.getElementsByTagName("li");
    if(isMouseLeaveOrEnter(event, obj)&&isMouseLeaveOrEnter(event, obj2)){
    issettime=true ;
    timecolsecategory=setTimeout(function(){
        //obj.style.display="none";
        //obj2.className = "ddnewhead_category";
        for(i=1;i<17;i++){
            if(sug_gid('__ddnav_sort'+i)){
                sug_gid('__ddnav_sort'+i).style.display="none";
                sug_gid('li_label_'+i).className="n_b";
            }
        }
        sug_gid('li_label_1').className = "n_b first";

    },100);
    flag++;
    var closeDiv=function(){
        window.clearInterval(bw1);
        var step = 15;
        if(isIE_c()){
            step = 5;
        }
        var obj_h=parseInt(obj.style.height);
        obj.style.overflow = "hidden";
        if(obj_h>1){
            obj.style.height=parseInt(obj_h-Math.ceil(obj_h)/step)+"px";
        }else{
            window.clearInterval(bw1);
            window.clearInterval(bw2);
            obj.style.overflow = "";
            obj.style.height = "0px";
            obj.style.display="none";
            sug_gid("nav_l").style.display = "none";
        }
    }
    bw2= setInterval(closeDiv,1);
   }
 }
function showdiv(event,ojb){
    clearTimeout(timeclosecategory);
  var obj = sug_gid(ojb);
    if(typeof(bw1)!= 'undefined'){
        window.clearInterval(bw1);
    }
    if(typeof(bw2)!= 'undefined'){
        window.clearInterval(bw2);
    }
  obj.style.display = "block";
    obj.style.overflow = "";
  //obj.style.height = 458 + "px";

}
 function isMouseLeaveOrEnter(e,handler){
      if(e.type != 'mouseout' && e.type != 'mouseover') return false;
      var reltg = e.relatedTarget ? e.relatedTarget : e.type == 'mouseout' ? e.toElement : e.fromElement;
       while(reltg && reltg != handler){
           reltg = reltg.parentNode;
       }
       return(reltg != handler);
   }

 function popmouseOver(index){
     if(!menudataloaded)return;
    clearTimeout(timecolsediv);
    if(index==1)
        sug_gid('li_label_'+index).className = "n_b first on";
    else
        sug_gid('li_label_'+index).className = "n_b on";
 }

function categoryOut(event,obj){
     if(!menudataloaded)return;
     if(isMouseLeaveOrEnter(event, obj)){
        for(i=1;i<21;i++){
            if(sug_gid('__ddnav_sort'+i)){
                sug_gid('__ddnav_sort'+i).style.display="none";
                sug_gid('li_label_'+i).className="n_b";
            }
        }
        sug_gid('li_label_1').className = "n_b first";
        for(i=15;i<21;i++){
           if(sug_gid('li_label_'+i)){
               sug_gid('li_label_'+i).style.display="none";
           }
        }
        //sug_gid('li_label_all').style.display="none";
    }
}

function activateSubmenu(row) {
    var $menu =document.getElementById("menulist_content");
    var submenuId = row.attributes["data-submenu-id"].value;
    var submenu = document.getElementById(submenuId);
    var width = $menu.offsetWidth;
    var index = row.attributes["data_index"].value;
    var key = row.attributes["data_key"].value;
    var type = row.attributes["data_type"].value;
    var label_id = row.attributes["id"].value;
    if(submenu){
        if(typeof(CreateCategoryForHome)=="function"){
            CreateCategoryForHome(index,key,type);
        }
        if(index==1){
            document.getElementById(label_id).className = "n_b first on";
        }else{
            document.getElementById(label_id).className = "n_b on";
        }
        submenu.style.display="block";
        var ob_height = submenu.clientHeight;
        var step = 30;
        switch(index){
            case "9" :submenu.style.top=(ob_height>=270)?"0px":((step*9-ob_height)-1)+"px";break;
            case "10":submenu.style.top=(ob_height>=300)?"0px":((step*10-ob_height)-1)+"px";break;
            case "11":submenu.style.top=(ob_height>=330)?"0px":((step*11-ob_height)-1)+"px";break;
            case "12":submenu.style.top=(ob_height>=360)?"0px":((step*12-ob_height)-1)+"px";break;
            case "13":submenu.style.top=(ob_height>=390)?"0px":((step*13-ob_height)-1)+"px";break;
            case "14":submenu.style.top=(ob_height>=420)?"0px":((step*14-ob_height)-1)+"px";break;
            case "15":submenu.style.top=(ob_height>=450)?"0px":((step*15-ob_height)-1)+"px";break;
            case "16":submenu.style.top=(ob_height>=480)?"0px":((step*16-ob_height)-1)+"px";break;
            default :submenu.style.top="0px";
        }
    }
}

function deactivateSubmenu(row) {
    var submenuId = row.attributes["data-submenu-id"].value;
    var submenu = document.getElementById(submenuId);
    var index = row.attributes["data_index"].value;
    var label_id = row.attributes["id"].value;
    if(submenu){
        if(index==1){
            document.getElementById(label_id).className = "n_b first";
        }else{
            document.getElementById(label_id).className = "n_b";
        }
        submenu.style.display="none";
    }
}

function loadCategoryJson(url)
{
     var scriptOld=document.getElementById('json_script');
     if(scriptOld!=null)
     {
        scriptOld.src = url;
        return;
     }
    var head=document.documentElement.firstChild,script=document.createElement('script');
    script.id='json_script';
    script.type = 'text/javascript';
    script.src = url;
    if(scriptOld!=null)
       head.replaceChild(script,scriptOld);
    else
       head.appendChild(script);
}
//-------------category end--------

//ff����
function isIE_c(){
   return window.navigator.userAgent.toLowerCase().indexOf("msie")>=1?true:false;
}
//��ȡie�汾
function getIEVersion(){
    var ret = -1 ;
    if(navigator.appName == "Microsoft Internet Explorer")
    {
          if(navigator.appVersion.match(/8./i)=='8.')
           {
                ret = 8 ;
           }
           if(navigator.appVersion.match(/7./i)=='7.')
           {
                ret = 7 ;
           }
           if(navigator.appVersion.match(/6./i)=='6.')
           {
               ret = 6 ;
           }
    }
    return ret ;
}

function ouputflash(flashurl,width,height){
    document.write ('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="'+width+'" height="'+height+'"><param name="movie" value="'+flashurl+'" /><param name="quality" value="high" /><param name="wmode" value="opaque" /><embed src="'+flashurl+'" quality="high" wmode="opaque" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="'+width+'" height="'+height+'" ></embed></object>');
}
//ͨ�ô��ڹ���
function showwindow(obj,objdiv,addx,addy){
    var x=getposOffset_top(obj,'left');
    var y=getposOffset_top(obj,'top');
    var div_obj=document.getElementById(objdiv);
        div_obj.style.left=(x+addx)+'px';
        if(addy==12)addy+=10;
        div_obj.style.top=(y+addy)+'px';
        div_obj.style.display="inline";
}

function Hidewindow(objdiv){
    var div_obj=document.getElementById(objdiv);
        if(div_obj){
                div_obj.style.display="none";
        }
}
//���������
function clearkeys(){
    if(sug_gid("label_key").style.visibility=="hidden"){
        var objfrm=document.searchform;
        objfrm.key.value = "";
    }else{
        sug_gid("label_key").style.visibility="hidden";
    }
    document.getElementById("key_S").focus();
}
function key_onblur(){
    var objfrm=document.searchform;
    if(objfrm.key!=undefined){
        if(header_trim(objfrm.key.value)==''){
            if(sug_gid("label_key").style.visibility=="hidden"){
                sug_gid("label_key").style.visibility="visible";
                document.getElementById("key_S").className='text gray';
            }
        }else{
            return;
        }
    }
    sug_gid("label_key").style.color="rgb(102, 102, 102)";
}
function key_onclick(event){
    if(is_input==true&&header_trim(document.searchform.key.value)==""){
        stop_propation(event);
        history_display();
    }
    if(document.getElementById("suggest_key").innerHTML!=""&&header_trim(document.searchform.key.value)!=""){
        suggest_tag = true;
        document.getElementById("suggest_key").style.display="inline";
    }
    if(document.getElementById("suggest_key").innerHTML==""&&header_trim(document.searchform.key.value)!=""){
        if(sugTO) clearTimeout(sugTO);
        sugTO = setTimeout(getkeyword,50);
    }
    if(sug_gid("label_key").style.visibility=="visible"){
        sug_gid("label_key").style.color="rgb(255, 255, 255)";
    }
}
function key_onfocus(event){
    this.className='text';
    if(is_input==true&&header_trim(document.searchform.key.value)==""){
        history_display();
    }
}
//����
function searchsubmit()
{
    var objfrm=document.searchform;
    if(sug_gname("li").length>0){
        for(sugnum=0;sugnum<sug_gname("li").length;sugnum++){
            if(sug_gname("li")[sugnum].className=="select_key"&&sug_gname("li")[sugnum].getAttribute("type")!="search"){
                sug_gname("li")[sugnum].onclick();
                return false;
            }
        }
    }
    if(cnlength(objfrm.key.value)<2){
        if(objfrm.key.value.length==0){
            if(objfrm.default_key.value.length==0){
                if(objfrm.catalog.value>4000000 && objfrm.catalog.value<=4000008){
            window.location="http://category.dangdang.com/";
            return false;
                }else if(objfrm.catalog.value>4000008){
            window.location="http://category.dangdang.com/list?cid="+objfrm.catalog.value;
            return false;
                }else if(objfrm.catalog.value.indexOf("01")===0){
            window.location="http://book.dangdang.com/";
            return false;
                }else if(objfrm.catalog.value.indexOf("03")===0){
            window.location="http://music.dangdang.com/";
            return false;
                }else if(objfrm.catalog.value.indexOf("05")===0){
            window.location="http://movie.dangdang.com/";
            return false;
                }else if(objfrm.catalog.value.indexOf("98")===0){
            window.location="http://e.dangdang.com/";
            return false;
          }
        }
        }
//        if(cnlength(objfrm.key.value)>=1){
//        alert("�����ʹ��̣���������д��");
//        objfrm.key.focus();
//        return false;
//    }
    }else{
        if(cnlength(objfrm.key.value)>70){
                alert("�����ʹ�������������д��");
                objfrm.key.focus();
                return false;
            }
     }


    //iE
    //objfrm.key.value=escape(objfrm.key.value)

    objfrm.key.value=objfrm.key.value.replace(/(^\s*)|(\s*$)/g, "");
    if(objfrm.key.value.length==0){
        objfrm.key.value = objfrm.default_key.value;
    }
    head_search_data("searchkey","",objfrm.key.value,"","");
    objfrm.key.value=objfrm.key.value.replace(/&/g,"%26");
    objfrm.key.value=objfrm.key.value.replace(/#/g,"%23");
    objfrm.key.value=objfrm.key.value.replace(/\+/g,"%2B");
    sug_gid("label_key").style.visibility="hidden";
    var browser=navigator.appName
    if(browser=="Microsoft Internet Explorer")
    {
      var location_url = "http://search.dangdang.com/?key="+encodeURI(objfrm.key.value)+"&act=input";
    }else{
      var location_url = "http://search.dangdang.com/?key="+objfrm.key.value+"&act=input";
    }

    if(objfrm.catalog.value=="readonline"){
    window.location="http://search.read.dangdang.com/search.php?"+objfrm.readSearchSelect.value+"="+objfrm.key.value;
    return false;
  }
  if(objfrm.catalog.value>=4000000 || objfrm.catalog.value==''){
        var category_id = "";
        if(objfrm.catalog.value!=''){
            category_id = "&category_id="+objfrm.catalog.value+"&type="+objfrm.catalog.value;
        }
    window.location=location_url+category_id;
    return false;
  }
  if(objfrm.catalog.value.indexOf("01")===0){
    window.location=location_url+"&category_path=01.00.00.00.00.00&type=01.00.00.00.00.00";
        return false;
    }
  if(objfrm.catalog.value.indexOf("03")===0){
    window.location=location_url+"&category_path=03.00.00.00.00.00&type=03.00.00.00.00.00";
        return false;
    }
  if(objfrm.catalog.value.indexOf("05")===0){
    window.location=location_url+"&category_path=05.00.00.00.00.00&type=05.00.00.00.00.00";
        return false;
    }
  if(objfrm.catalog.value.indexOf("98")===0){
    window.location=location_url+"&category_path=98.00.00.00.00.00&type=98.00.00.00.00.00";
        return false;
    }
  if(objfrm.catalog.value.indexOf("100000")===0){
    window.location=location_url+"&filter="+encodeURI("0|0|0|1|0|0|")+"&type=100000";
        return false;
    }
  if(objfrm.catalog.value=="comm"){
        objfrm.action="http://comm.dangdang.com/searchlist.php"
    }

  return true ;
}

function cnlength(str){
    return str.replace(/[^\x00-\xff]/gi,'oo').length;
}

/******************************************************************/

function AddToShoppingCart(product_id,buynum)
{
/*product_id������ʽ��
 *1.������Ʒ����
 * AddToShoppingCart(product_id)
 *2.������Ʒ������
 * AddToShoppingCart(product_id,buynum)
 *3.�����Ʒ����
 * product_id="123,234,345,456";
 * AddToShoppingCart(product_id)
 *4.�����Ʒ������
 * product_id="123.1,234.2,345.1,456.5 ";
 * AddToShoppingCart(product_id)
 **/
         var url=null;
         var productnum="";
         var permanent_id=getCookie_one('__permanent_id');
         if(permanent_id!=''){
             permanent_id=permanent_id.substring((permanent_id.length-5),permanent_id.length);
         }else{
             permanent_id=0;
         }
         if((permanent_id%10)==1){
             strdomainshopcart=newdomainshopcart;
         }
         if(arguments.length==2){
             url=strdomainshopcart+"/shoppingcart/shopping_cart_add.aspx?product_ids="+product_id+"."+parseInt(buynum)+"&referer="+doc_referer+"&prev_referer="+doc_prev_referer;
         }else{
             productnum=product_id;
             if(arguments.length==1){
                 if(productnum==null||parseInt(productnum)<1){
                      url=strdomainshopcart+"/shoppingcart/shopping_cart.aspx?product_ids="+productnum+"&referer="+doc_referer+"&prev_referer="+doc_prev_referer;
                 }
                 else{
                      url=strdomainshopcart+"/shoppingcart/shopping_cart_add.aspx?product_ids="+productnum+"&referer="+doc_referer+"&prev_referer="+doc_prev_referer;
                 }          
             }
         }
         var popup=window.open(url,"shoppingcart");
         //window.location.href = url; 
         popup.focus()
}

/******************************************************************/

function AddToFavorlist(product_id)
{
         var url="http://customer.dangdang.com/wishlist/cust_wish_add.aspx?productid="+product_id;
         var popup=window.open(url,"favorlist");
         popup.focus()
}

function AddPDNothing(pid){
    var url='http://misc2.dangdang.com/pdnothing/form.php?pid='+pid;
    var ww=385;var wh=337;var w = 1024;var h = 768;
    if (document.all || document.layers){
        w = screen.availWidth;
        h = screen.availHeight;}
    var l = (w/2-ww/2);
    var t = (h/2.3-wh/2.3);
    window.open(url,"","width="+ww+",height="+wh+",top="+t+",left="+l);
}

function top_banner_over(){
     var h = parseInt(document.getElementById("myflash").style.height.replace("px"));
     var hz= parseInt(document.getElementById("reco_top_container").style.height.replace("px"));
     if (hz < divMaxHeight){
         document.getElementById("myflash").style.height = h + 25 +"px";
         document.getElementById("reco_top_container").style.height = hz + 25 +"px";
         clearTimeout(act);
         act = setTimeout('over()', 1);
     }
}

function top_banner_out(){
     var h = parseInt(document.getElementById("myflash").style.height.replace("px"));
     var hz= parseInt(document.getElementById("reco_top_container").style.height.replace("px"));
     if(hz<=divMinHeight+4) {
         document.getElementById("myflash").style.display="none";
         document.getElementById("flash").innerHTML="";
         document.getElementById("likevoit").className="";
     }
     if (hz > divMinHeight) {
         document.getElementById("myflash").style.height = h - 25+ "px";
         document.getElementById("reco_top_container").style.height = hz -25 +"px";
         clearTimeout(act);
         act = setTimeout('out()', 1);
     }
}
var timehidecategory;
var isputtime=false ;
function showotherCateogry(){
    for(i=15;i<21;i++){
        if(sug_gid('li_label_'+i)){
            sug_gid('li_label_'+i).style.display="block";
        }
    }
    //sug_gid('li_label_all').style.display="block";
}
function hideotherCateogry(event,did){
    var obj1=sug_gid(did);
    var obj2= sug_gid("a_category");
   if(isMouseLeaveOrEnter(event,obj1)&&isMouseLeaveOrEnter(event, obj2)){
        isputtime=true ;
        timehidecategory=setTimeout(function(){
           for(i=15;i<21;i++){
               if(sug_gid('li_label_'+i)){
                   sug_gid('li_label_'+i).style.display="none";
               }
            }
            //sug_gid('li_label_all').style.display="none";
            },100);
   }
}
function getOs()
{
   if(navigator.userAgent.indexOf("MSIE")>0) {
        return 1;
   }
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
        return 2;
   }
   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
        return 3;
   }
   if(isCamino=navigator.userAgent.indexOf("Camino")>0){
        return 4;
   }
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){
        return 5;
   }

}
//doc_city
function show_city_list(){
    sug_gid('city_list').style.display = "block";
}
function hidden_cyty_list(){
    sug_gid('city_list').style.display = "none";
}
function change_city(key,value){
    if(key==0){
        sug_gid('city_name').innerHTML = value;
    }else{
        sug_gid('city_name').innerHTML = value+"վ";
    }
    sug_gid('city_list').style.display = "none";
    document.cookie = "city_id=cityid_"+key+";Domain=dangdang.com";
    window.location.reload();
}
//doc_area
function show_area_list(){
    sug_gid("area_one").className = "ddnewhead_area_a hover";
        sug_gid('area_list').style.display = "block";
}
function hidden_area_list(){
    sug_gid("area_one").className = "ddnewhead_area_a";
    sug_gid('area_list').style.display = "none";
}
function change_area(key,value){
    sug_gid("curent_area").innerHTML = value;
    var oDate=new Date();
    oDate.setDate(oDate.getDate()+365);
    if(key!=174){
    document.cookie = 'dest_area='+escape('country_id=9000&province_id='+key+'&city_id =0&district_id=0&town_id=0')+';Domain=dangdang.com;path=/;expires='+oDate.toGMTString();
    }
    hidden_area_list();
}
function header_closediv(noneid){
     var obj1=sug_gid(noneid);
     obj1.style.display="none";
}
