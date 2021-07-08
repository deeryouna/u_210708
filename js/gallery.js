var url = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
var user = "193198747@N03"

//사용자 
$.ajax({
    url:url,
    dataType: "json",
    data: {
        api_key: "95ee8ca862b4ef62b8841c89f002dcc9",
        per_page: 8,
        format: "json",
        nojsoncallback: 1,
        user_id : user //호출하고 싶은 유저 아이디 입력    
    }
})
//데이터 호출이 성공하면 html구조 생성
.success(function(data){
    //변수에 배열형태의 자료를 뽑아서 저장
    var imgs = data.photos.photo;
    
    //배열의 갯수만큼 반복을 돌면서
    //반복문만들기(each or for문으로)
    $(imgs).each(function(index,data){
        //각 이미지의 제목 저장
        var tit = data.title;
        var imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;

        //각 큰이미지의 주소 저장
        var imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;

        //반복하며 생성할 태그를 템플릿 문자열 형태로 미리 지정
        var tags = `
            <article>
                <div class="inner">
                    <div class="pic" data-src=${imgSrcBig}>
                        <img src="${imgSrc}">
                    </div>
                    <h2>${tit}</h2>
                </div>
            </article>
        `;

        //갤러리 프레임 안쪽에 반복을 돌면서 위쪽의 태그구조를 동적으로 추가
        $("#gallery").append(tags);
    })
})

.error(function(err){
    console.log(err);
})

$("body").on("click", "#gallery article .pic",function(){
    var imgSrc = $(this).attr("data-src");
    
    var tags = `
        <aside id="imgPop">
            <div class="pic">
                <img src="${imgSrc}">

            </div>
            <span>CLOSE</span>
        </aside>
    `;

    $("body").append(tags);
});

//이미지 닫기
$("body").on("click", "#imgPop span", function(e){
    e.preventDefault();

    $(this).parent("#imgPop").fadeOut(500, function(){
        $(this).remove();
    });
});