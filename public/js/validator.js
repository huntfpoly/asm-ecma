function Validator(formSelector) {
    let _this = this;
    let formRules = {};

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    /**
     * Quy uoc tao rule:
     * - khi co loi thi return errror message
     * - k co loi thi return required
     */
    let validatorRules = {
        required: function (value) {
            return value ? undefined : "Vui long nhap truong nay";
        },
        email: function (value) {
            let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value)
                ? undefined
                : "Vui long nhap dung dinh dang email";
        },
        min: function (min) {
            return function (value) {
                return value.length >= min
                    ? undefined
                    : `Vui long nhap it nhat ${min} ki tu`;
            };
        },
        max:  (max) => {
            return value => value.length <= max ? undefined: `Vui long nhap nhieu nhat ${max} ki tu`;
        }
        ,number: function (value) {
            return typeof parseInt(value) === 'number' && isFinite(value) && value > 0 ? undefined : "Vui long nhap so va lon hon 0";
        }
    };
    // lay ra form element trong DOM
    let formElement = document.querySelector(formSelector);
    // chi xu ly khi element co trong DOME
    if (formElement) {
        let inputs = formElement.querySelectorAll("[name][rules]");
        for (let input of inputs) {
            if (Object.hasOwnProperty) {
                let rules = input.getAttribute("rules").split("|");
                for (let rule of rules) {
                    let isRulehasValue = rule.includes(":");
                    let ruleInfo;

                    if (isRulehasValue) {
                        ruleInfo = rule.split(":");
                        rule = ruleInfo[0];
                    }
                    let ruleFunc = validatorRules[rule];

                    if (isRulehasValue) {
                        ruleFunc = ruleFunc(ruleInfo[1]);
                    }
                    // console.log(ruleFunc);

                    // Kiểm tra value của key [input.name] trong object formRules có phải array hay k
                    if (Array.isArray(formRules[input.name])) {
                        // console.log(rule);

                        formRules[input.name].push(ruleFunc);
                    } else {
                        formRules[input.name] = [ruleFunc];
                    }
                }
                // Lắng nghe sự kiện để validate(blur, change...)
                input.onblur = handleValidate;
                input.oninput = handleClearError;

            }
        }

        // hàm thực hiện validate
        function handleValidate(event) {
            // rules la 1 mảng chứa các function được thêm bên trên
            let rules = formRules[event.target.name];
            // console.log(rules);
            let errorMessage;

            for (let rule of rules) {
                // e.target.value là lấy ra giá trị của field khi mình focus vào
                errorMessage = rule(event.target.value);
                // Nó thực hiện các function ở validatorRules và trả về giá trị
                // console.log(rule);
                // console.log(errorMessage);
                if (errorMessage) break;
            }

            // Neu co loi thi hien thi message loi ra UI
            if (errorMessage) {
                // tìm ra thằng cha có class là form-group
                let formGroup = getParent(event.target, ".form-group");
                //Nếu mà thấy thì ta mới add class vào
                if (formGroup) {
                    formGroup.classList.add("invalid");
                    let formMessgae = formGroup.querySelector(".form-message");
                    if (formMessgae) {
                        formMessgae.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage;
        }
        // function xử lý clear error
        function handleClearError(event) {
            let formGroup = getParent(event.target, ".form-group");

            if (formGroup.classList.contains("invalid")) {
                formGroup.classList.remove("invalid");
                let formMessgae = formGroup.querySelector(".form-message");
                if (formMessgae) {
                    formMessgae.innerText = "";
                }
            }
        }

        // console.log(formRules);
    }

    // Xu ly hanh vi submit form
    formElement.onsubmit = function (event) {
        event.preventDefault();

        function handleValidate(event) {
            let rules = formRules[event.target.name];
            // console.log(rules);
            let errorMessage;

            for (let rule of rules) {
                errorMessage = rule(event.target.value);
                // console.log(errorMessage);
                if (errorMessage) break;
            }

            // Neu co loi thi hien thi message loi ra UI
            if (errorMessage) {
                let formGroup = getParent(event.target, ".form-group");
                if (formGroup) {
                    formGroup.classList.add("invalid");
                    let formMessgae = formGroup.querySelector(".form-message");
                    if (formMessgae) {
                        formMessgae.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage;
        }

        let inputs = formElement.querySelectorAll("[name][rules]");
        let isValid = true;
        // console.log(formRules)

        for (let input of inputs) {

            if (!handleValidate({ target: input })) {
                isValid = false;
            }
        }

        if (isValid) {
            if (typeof _this.onSubmit === "function") {
                // console.log(handleValidate())
                let enableInputs = formElement.querySelectorAll("[name]");
                let formValues = Array.from(enableInputs).reduce((values, input) => {
                    switch (input.type) {
                        case "radio":
                            values[input.name] = formElement.querySelector(
                                'input[name="' + input.name + '"]:checked'
                            ).value;
                            break;
                        case "checkbox":
                            if (!input.matches(":checked")) {
                                values[input.name] = "";
                                return values;
                            }
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        case "file":
                            values[input.name] = input.files;
                            break;
                        default:
                            values[input.name] = input.value;
                    }
                    return values;
                }, {});
                // nó là callback có tham số data bên AdminAdd nên ở đây ta truyền vào các giá trị trong form
                _this.onSubmit(formValues);

            }
            // Trường hợp submit với hành vi mặc định
            else {
                formElement.submit();
            }
        }
    };
}

export default Validator;