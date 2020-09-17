// created by pkiin 19/11/07
// modified by saladsong 20/06/12

//submit button on click
let submitBtn = document.querySelector('#go_Btn');
submitBtn.addEventListener("click", ()=>{
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let gender = document.getElementById("gender").value;


    var all_checked = 0;
    if(document.getElementById("check_nutricore_mv").checked || document.getElementById("check_centrum_mv_fm").checked || document.getElementById("check_centrum_mv_fw").checked || 
      document.getElementById("check_cenovis_mv").checked || document.getElementById("check_aronamin_gold").checked || document.getElementById("check_aronamin_c").checked ||
      document.getElementById("check_impactamin").checked || document.getElementById("check_impactamin_pre").checked || document.getElementById("check_nutrione_lutein").checked || 
      document.getElementById("check_ahngook_lutein").checked || document.getElementById("check_ckd_lutein").checked || document.getElementById("check_ckd_milkth").checked || 
      document.getElementById("check_boto_milkth").checked || document.getElementById("check_gnm_millkth").checked || document.getElementById("check_ckd_cal").checked ||
      document.getElementById("check_vitahalo_cal").checked || document.getElementById("check_mapletree_cal").checked){
      var myevent = [];
        if(document.getElementById("check_nutricore_mv").checked){
            myevent.push('뉴트리코어 멀티비타민미네랄');
        }
        if(document.getElementById("check_centrum_mv_fm").checked){
            myevent.push('센트룸 멀티비타민 포맨');
        }
        if(document.getElementById("check_centrum_mv_fw").checked){
            myevent.push('센트룸 멀티비타민 포우먼');
        }
        if(document.getElementById("check_cenovis_mv").checked){
            myevent.push('세노비스 어드밴스드 트리플러스 멀티비타민');
        }       
        if(document.getElementById("check_aronamin_gold").checked){
            myevent.push('아로나민 골드');
        }
        if(document.getElementById("check_aronamin_c").checked){
            myevent.push('아로나민 씨플러스');
        }
        if(document.getElementById("check_impactamin").checked){
            myevent.push('임팩타민');
        }
        if(document.getElementById("check_impactamin_pre").checked){
            myevent.push('임팩타민 프리미엄');
        }            
        if(document.getElementById("check_nutrione_lutein").checked){
            myevent.push('뉴트리원라이프 루테인 지아진틴 164 EX');
        }
        if(document.getElementById("check_ahngook_lutein").checked){
            myevent.push('안구건강 NEW 눈에 좋은 루테인 플러스');
        }
        if(document.getElementById("check_ckd_lutein").checked){
            myevent.push('종근당 건강 아이클리어 루테인 지아잔틴');
        }
        if(document.getElementById("check_ckd_milkth").checked){
            myevent.push('종근당 건강 헬씨칸 밀크씨슬 영양제');
        }
        if(document.getElementById("check_boto_milkth").checked){
            myevent.push('보뚜 간에좋은 밀크씨슬 프리미엄');
        }
        if(document.getElementById("check_gnm_millkth").checked){
            myevent.push('자연의 품격 건강한 간 밀크씨슬');
        }       
        if(document.getElementById("check_ckd_cal").checked){
            myevent.push('종근당 칼슘 앤 마그네슘 비타민D 아연');
        }
        if(document.getElementById("check_vitahalo_cal").checked){
            myevent.push('비타할로 영양제 칼슘 마그네슘 비타민D 아연');
        }
        if(document.getElementById("check_mapletree_cal").checked){
            myevent.push('메이플트리 칼슘마그네슘아연 플러스 비타민D');
        }

        console.log(myevent);
        all_checked = all_checked + 1;
    }
    else{
        alert("영양제를 하나 이상 선택해 주세요");
    }
    if(name==""){
        alert("이름을 입력해 주세요");
        all_checked = all_checked + 1;
    }
    if(age==""){
        alert("나이를 입력해 주세요");
        all_checked = all_checked + 1;
    }
    if(gender==""){
        alert("성별을 선택해 주세요");
        all_checked = all_checked + 1;
    }

	if(all_checked==1){
        let name = document.getElementById("name").value;

        console.log(name, age, gender);
        request_response(name, age, gender, myevent).then((res) => {
            console.log(res);
            return res.json();

        }).then((data) => {
            console.log(data);
            document.getElementById("name_").value = data["name_"];
            document.getElementById("nut_").value = data["nut_"];
            document.getElementById("pct_").value = data["pct_"];
            console.log(document.getElementById("name_").value);
            console.log(document.getElementById("nut_").value);
            console.log(document.getElementById("pct_").value);
            document.getElementById("form").submit();
        });
	}
});

//function request_response(_gamedate, _team, _event, _myteam_only, _maxtime)
function request_response(_name, _age, _gender, _myevent)
{
    let formdata = new FormData();
    formdata.append("name",_name);
    formdata.append("age",_age);
    formdata.append("gender",_gender);
    formdata.append("myevent",_myevent);
    let myInit = {
        method: 'POST',
        body: formdata
    };
    return fetch('/ret', myInit);
}
