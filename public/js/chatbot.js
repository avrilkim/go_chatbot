console.log('chatbot script start');



function MessageCall() {
    console.log('ajax call');
    $.ajax({
        type: 'POST',
        cache: false,
        url: 'http://localhost:3000/message',
        data: createData(),
        headers:{"Content-Type":"application/json"},
        beforeSend: function () {
            $(this).html("Loading...");
        },
        success: function (data) {
            // Now lets return
            var msg =  jQuery.parseJSON(JSON.stringify(data));
           // console.dir(msg.messame.text);

            var d = new Date();
            var n = d.toLocaleString([], { hour: '2-digit', minute: '2-digit' });

            var el = '';
            el += '<div class="answer_sec">';
            el += ' <div class="chat-con">';
            el += '     <div><a href="" class="profile_img"><img src="http://ld-wp.template-help.com/wordpress_63333_default-sample/wp-content/uploads/2017/04/person-3.jpg" alt=""></div></a>';
            el += '     <p>'+msg.message+'</p>';
            el += '     <span>'+n+'</span>';
            el += ' </div>';
            el += '</div>';
            $('.chat-conversation').append(el);
        },
        error: function(html, status) {
            console.log(html.responseText);
            console.log(status);
        }
    });
}

function createData() {
    var msg = $('#messageIpt').val();
    var sendData = JSON.stringify({content:msg});
    console.log('입력 메세지 : ', sendData);
    var sendmsg = $('#messageIpt').val()
    var d = new Date();
    var n = d.toLocaleString([], { hour: '2-digit', minute: '2-digit' });

    //question 입력
    var el = '';
    el += '<div class="question_sec">';
    el += ' <div class="chat-con">';
    el += '     <span>'+n+'</span>';
    el += '     <p>'+msg+'</p>';
    el += '     <div><a href="" class="profile_img"><img src="http://ld-wp.template-help.com/wordpress_63333_default-sample/wp-content/uploads/2017/04/person-3.jpg" alt=""></div></a>';
    el += ' </div>';
    el += '</div>';
    $('.chat-conversation').append(el);
    $('#messageIpt').val('').focus();
    return sendData;
}

$('#messageIpt').on('keydown', function(e) {
    console.log(e.keyCode)
    if (e.keyCode == 13) {
        MessageCall();
    }
});