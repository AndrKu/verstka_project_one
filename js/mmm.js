/*/**
 * @package Helix3 Framework
 * @author JoomShaper http://www.joomshaper.com
 * @copyright Copyright (c) 2010 - 2016 JoomShaper
 * @license http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 or later
 */

jQuery(function ($) {

    // **************    START Offcarvas    *************** //
    // **************************************************** //
   if (sp_offanimation == 'default') {
        //Default
        $('#offcanvas-toggler').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').addClass('offcanvas');
        });

        $('.offcanvas-overlay').insertBefore('.offcanvas-menu');
        $('.close-offcanvas, .offcanvas-overlay').on('click', function (event) {
            event.preventDefault();
            $('.off-canvas-menu-init').removeClass('offcanvas');
        });
    }
    // Slide Top Menu
    //preloader Function
    function move() {
        var elem = document.getElementById("line-load");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
            }
        }
    }

    // **************  START Feature SCRIPT *************** //
    // **************************************************** //

    //template tab
    $(document).ready(function () {
        $('.sppb-knight-tab').each(function (index) {
            var id = 'sppb-knight-tab' + (index + 1);

            $(this).find('.sppb-nav').children().each(function (index) {
                $(this).find('>a').attr('href', '#' + id + '-' + (index + 1))
            });

            $(this).find('.sppb-tab-content').children().each(function (index) {
                $(this).attr('id', id + '-' + (index + 1))
            });

        });
    });

    // **************  START Others SCRIPT  *************** //
    // **************************************************** //

    //Tooltip
    //$('[data-toggle="tooltip"]').tooltip();

    // Article Ajax voting
    $(document).on('click', '.sp-rating .star', function (event) {
        event.preventDefault();

        var data = {
            'action': 'voting',
            'user_rating': $(this).data('number'),
            'id': $(this).closest('.post_rating').attr('id')
        };

        var request = {
            'option': 'com_ajax',
            'plugin': 'helix3',
            'data': data,
            'format': 'json'
        };

        $.ajax({
            type: 'POST',
            data: request,
            beforeSend: function () {
                $('.post_rating .ajax-loader').show();
            },
            success: function (response) {
                var data = $.parseJSON(response.data);

                $('.post_rating .ajax-loader').hide();

                if (data.status == 'invalid') {
                    $('.post_rating .voting-result').text('You have already rated this entry!').fadeIn('fast');
                } else if (data.status == 'false') {
                    $('.post_rating .voting-result').text('Somethings wrong here, try again!').fadeIn('fast');
                } else if (data.status == 'true') {
                    var rate = data.action;
                    $('.voting-symbol').find('.star').each(function (i) {
                        if (i < rate) {
                            $(".star").eq(-(i + 1)).addClass('active');
                        }
                    });

                    $('.post_rating .voting-result').text('Thank You!').fadeIn('fast');
                }

            },
            error: function () {
                $('.post_rating .ajax-loader').hide();
                $('.post_rating .voting-result').text('Failed to rate, try again!').fadeIn('fast');
            }
        });
    });

    // **************  END:: Others SCRIPT  *************** //
    // **************************************************** //


    //Search
    $(".fa-search").on('click', function () {
        $(".top-search-input-wrap").fadeIn(400);
        $(this).hide();
        $('.top-search-wrapper').addClass('active');
        $('.fa-times').show();
        $(".top-search-input-wrap").addClass('active');
    });

    $(".fa-times").on('click', function () {
        $(".top-search-input-wrap").fadeOut(400);
        $(this).hide();
        $('.top-search-wrapper').removeClass('active');
        $('.fa-search').show();
        $(".top-search-input-wrap").removeClass('active');
    });  

    //For react template
   var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            var newNodes = mutation.addedNodes;
            if (newNodes !== null) {
                var $nodes = $(newNodes);

                $nodes.each(function () {
                    var $node = $(this);
                    $node.find('.projects-sliders').each(function () {
                        $('.projects-sliders').owlCarousel({
                            stagePadding: 183,
                            loop: true,
                            center: true,
                            dots: false,
                            smartSpeed: 500,
                            margin: 0,
                            items: 2,
                            nav: true,
                            navContainer: '#projectSlideCusomNav',
                            navText: ['<span class="fa fa-chevron-left"></span>', '<span class="fa fa-chevron-right"></span>'],
                            autoplay: true,
                            responsive: {
                                0: {
                                    items: 1,
                                    margin: 0,
                                    stagePadding: 0
                                },
                                480: {
                                    items: 1,
                                    margin: 0,
                                    stagePadding: 0
                                },
                                550: {
                                    items: 2,
                                    margin: 0,
                                    stagePadding: 80
                                },
                                768: {
                                    items: 1,
                                    margin: 0,
                                    stagePadding: 0
                                },
                                992: {
                                    items: 2,
                                    margin: 0,
                                    stagePadding: 80
                                },
                                1199: {
                                    items: 2,
                                    margin: 0,
                                    stagePadding: 100
                                },
                                1200: {
                                    items: 2,
                                },
                                1599: {
                                    items: 2,
                                    stagePadding: 150
                                },
                                1900: {
                                    items: 2,
                                    stagePadding: 183
                                }
                            }
                        });
                    });
                });

                $nodes.each(function () {
                    var $node = $(this);
                    $node.find('#slide-fullwidth').each(function () {
                        var $slideFullwidth = $("#slide-fullwidth");
                        var $autoplay = $slideFullwidth.attr("data-sppb-slide-ride");
                        if ($autoplay == "true") { var $autoplay = true; } else { var $autoplay = false };

                        var $controllers = $slideFullwidth.attr("data-sppb-slidefull-controllers");
                        if ($controllers == "true") { var $controllers = true; } else { var $controllers = false };

                        $slideFullwidth.owlCarousel({
                            margin: 0,
                            loop: true,
                            video: true,
                            autoplay: $autoplay,
                            animateIn: "fadeIn",
                            animateOut: "fadeOut",
                            autoplayHoverPause: true,
                            autoplaySpeed: 1500,
                            responsive: {
                                0: {
                                    items: 1
                                },
                                600: {
                                    items: 1
                                },
                                1000: {
                                    items: 1
                                }
                            },
                            dots: $controllers,
                        });

                        $(".sppbSlidePrev").click(function () {
                            $slideFullwidth.trigger("prev.owl.carousel", [400]);
                        });

                        $(".sppbSlideNext").click(function () {
                            $slideFullwidth.trigger("next.owl.carousel", [400]);
                        });

                        $("#slide-fullwidth .owl-controls").addClass("container");
                    });
                });

                $nodes.each(function () {
                    var $node = $(this);
                    $node.find('.gallery-image-box').each(function () {
                        $("a[rel^=\'prettyPhoto\']").prettyPhoto({
                            social_tools: false,
                            theme: "sppb_prettyphoto",
                            horizontal_padding: 20,
                            overlay_gallery: false
                        });
                    });
                });
                
            }
        });
    });

    var config = {
        childList: true,
        subtree: true
    };
    // Pass in the target node, as well as the observer options
    observer.observe(document.body, config);


});


Удалено

 // Slide Top Menu
    //preloader Function
   /* function move() {
        var elem = document.getElementById("line-load");
        var width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
            }
        }
    }  */

 // **************  START Feature SCRIPT *************** //
    // **************************************************** //

    //template tab
   /* $(document).ready(function () {
        $('.sppb-knight-tab').each(function (index) {
            var id = 'sppb-knight-tab' + (index + 1);

            $(this).find('.sppb-nav').children().each(function (index) {
                $(this).find('>a').attr('href', '#' + id + '-' + (index + 1))
            });

            $(this).find('.sppb-tab-content').children().each(function (index) {
                $(this).attr('id', id + '-' + (index + 1))
            });

        });
    }); */