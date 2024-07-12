$(document).ready(() => {
    // Открываем оверлей при адаптиве
    $('#burger').on('click', function () {
        $('#menu').addClass('open');
    });

    // Закрываем оверлей при адаптиве
    $('#menu *').on('click', function () {
        $('#menu').removeClass('open');
    });

    // Плавный скролл до `products`
    $('.macaroons-info-btn').click(function () {
        $('.products')[0].scrollIntoView({behavior: 'smooth'})
    });

    // Выбор продукта и плавный скролл до `order`
    $('.product-item-btn').click((e) => {
        $('#product').val($(e.target).parents('.product-item-action').find('.product-item-title').text());
        $('.order')[0].scrollIntoView({behavior: "smooth"});
    });

    let loader = $('.loaders');
    let phone = $('#phone');
    let name = $('#name');

    // Запрещаем ввод букв в поле `phone`
    phone.on('input', function () {
        let value = $(this).val();
        $(this).val(value.replace(/[^\d]/g, ''));
    });

    // Запрещаем ввод цифр в поля `Имя`
    name.on('input', function () {
        this.value = this.value.replace(/[^A-z, А-я]/g, '');
    });

    $('#submit').click(function (event) {
        // event.preventDefault();

        let form = $('.form-input');
        let product = $('#product');
        let hasError = false;

        // Сбрасываем цвет рамки для всех полей
        form.css('border-color', '');

        // По умолчанию скрываем ошибки в input
        $('.error-input').hide();

        if (!product.val()) {
            product.css('border-color', 'red');
            product.next().show();
            hasError = true;
        }

        if (!name.val()) {
            name.css('border-color', 'red');
            name.next().show();
            hasError = true;
        }

        if (!phone.val()) {
            phone.css('border-color', 'red');
            phone.next().show();
            hasError = true;
        }

        if (!hasError) {
            // Показываем лоадер только если форма корректна
            loader.css('display', 'flex');

            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {product: product.val(), name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    // Скрываем лоадер после завершения запроса
                    loader.hide();

                    if (msg.success) {
                        let inputForm = $('#order-form');
                        let formMessage = $('#form-message');


                        // Плавно скрываем форму
                        inputForm.fadeOut('slow', function () {
                            // Показываем сообщение после скрытия формы
                            formMessage.fadeIn('slow');

                            // Показываем форму снова через 10 секунд
                            setTimeout(function () {
                                formMessage.fadeOut('slow', function () {
                                    inputForm.fadeIn('slow');
                                    // Очищаем содержимое полей
                                    $('form[name=my-form]').trigger('reset');
                                });
                            }, 10000);
                        });
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                    }
                });
        }
    });
});


// Установили текущий год `footer`
$(function () {
    $(".year").text((new Date).getFullYear());
});
