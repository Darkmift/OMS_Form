// /http://bootstrapvalidator.votintsev.ru/getting-started/
/// http://bootstrapvalidator.votintsev.ru/validators/date/
var cl = console.log.bind(console);
cl("online");
//your account name
var ACCOUNT_NAME = "DEMOSUP";
//your account's department
var ACCOUNT_DEPARTMENT = "A";
//your account's server prefix
var SERVER_NAME = "bear";
var formActionUrl = `http://${SERVER_NAME}.hellomoving.com/wc.dll?mpdir~moduleret~${ACCOUNT_NAME}~${ACCOUNT_DEPARTMENT}`;
var dateInputMove = $('[name="MOVEDATE"]');
$(document).ready(function() {
    $('#contact_form').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                SNAME: {
                    validators: {
                        stringLength: {
                            min: 2,
                        },
                        notEmpty: {
                            message: 'Please supply your Full Name'
                        }
                    }
                },
                EMAIL: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply your email address'
                        },
                        emailAddress: {
                            message: 'Please supply a valid email address'
                        }
                    }
                },
                STELH: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply your phone number'
                        },
                        phone: {
                            country: 'US',
                            message: 'Please supply a vaild phone number with area code'
                        }
                    }
                },
                STELO: {
                    validators: {
                        // notEmpty: {
                        //     message: 'Please supply your phone number'
                        // },
                        phone: {
                            country: 'US',
                            message: 'Please supply a vaild Cell phone number with area code'
                        }
                    }
                },
                MOVEDATE: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply a date'
                        },
                        date: {
                            message: 'The date is not valid',
                            format: 'YYYY-MM-DD'
                        },
                        callback: {
                            message: 'Please supply a valid future date',
                            callback: function(value, validator) {
                                cl('date', value);
                                var inputDate = new Date(value);
                                var thisDay = new Date(chromeToday);
                                if (inputDate < thisDay) {
                                    return false;
                                }
                                return true;
                            }
                        }
                    }
                },
                SZIP: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply the zip code your moving from'
                        },
                        zipCode: {
                            country: 'US',
                            message: 'Please supply a vaild zip code'
                        }
                    }
                },
                RZIP: {
                    validators: {
                        notEmpty: {
                            message: 'Please supply the zip code your moving to'
                        },
                        zipCode: {
                            country: 'US',
                            message: 'Please supply a vaild zip code'
                        }
                    }
                },
                ROOMS: {
                    validators: {
                        message: 'Please select region.'
                    }
                },
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({
                    opacity: "show"
                }, "slow") // Do something ...
            $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post(formActionUrl, $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});


///fetch today's date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

dd = dd < 10 ? '0' + dd : dd;
mm = mm < 10 ? '0' + mm : mm;

// var today = mm + '/' + dd + '/' + yyyy;
var chromeToday = yyyy + '-' + mm + '-' + dd;
//dateInputMove.attr("min", chromeToday);
dateInputMove.val(chromeToday);