$(document).ready(function () {

    /**
     * Firebase config
     */
    var config = {
        apiKey: "AIzaSyAes9n5o_RH3ZfDHPQDEPud4H-aQ2evIIY",
        authDomain: "demoapp-d69ac.firebaseapp.com",
        databaseURL: "https://demoapp-d69ac.firebaseio.com",
        projectId: "demoapp-d69ac",
        storageBucket: "demoapp-d69ac.appspot.com",
        messagingSenderId: "541882284929"
    };
    firebase.initializeApp(config);

    /**
     * Show/hide sticky navigation on page scroll
     */

    $('.js--section-features').waypoint(function (direction) {
        if (direction == 'down') {
            $('nav').addClass('sticky');
        } else {
            $('nav').removeClass('sticky');
        }
    }, {
        offset: '60px'
    });

    /**
     * Navigation scrolling
     */
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

    /**
     * Mobile navigation toggle
     */
    var mainNav = $('.js--main-nav');
    var mobileNavToggleIcon = $('.mobile-nav-toggle i');

    $('.mobile-nav-toggle').click(function () {
        mainNav.slideToggle(200);

        if (mobileNavToggleIcon.hasClass('ion-navicon-round')) {
            mobileNavToggleIcon.addClass('ion-close-round');
            mobileNavToggleIcon.removeClass('ion-navicon-round');
        } else {
            mobileNavToggleIcon.addClass('ion-navicon-round');
            mobileNavToggleIcon.removeClass('ion-close-round');
        }
    });



    $('.btn-submit').click(function () {

        var name = document.getElementById('name');
        var email = document.getElementById('email');
        var findUs = document.getElementById('find-us');
        var message = document.getElementById('message');

        if (name.value === "" || email.value === "" || message.value === "") {
            return;
        }

        var contactData = {
            name: name.value,
            email: email.value,
            referenced_by: findUs.value,
            message: message.value
        }

        sendDataToFirebase(contactData);

        $('.send-success').removeClass('hide-element');
        $('.contact-form')[0].reset();
    })

    $('.send-success i').click(function () {
        $('.send-success').addClass('hide-element');
    });


    function sendDataToFirebase(userData) {
        var key = firebase.database().ref().child('omnifood').push().key;
        var databaseRef = firebase.database().ref().child('omnifood').child(key);
        databaseRef.set(userData);
    }
});