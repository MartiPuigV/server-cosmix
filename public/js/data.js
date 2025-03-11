document.getElementById("data-fetch-amount").addEventListener("click", function () {
    const unit = document.getElementById("unit-selection").value;
    const amount = document.getElementById("amount-selection").value;
    
    window.location.href = `/${unit}/${amount}`;
})

document.getElementById("data-fetch-date").addEventListener("click", function () {
    const month = document.getElementById("month-selection").value;
    const year = document.getElementById("year-selection").value;
    
    if (! (0 <= month <= 11)) {
        return
    }

    if (year <= 2024) {
        return
    }

    const mapping = ["january", "february", "march", "april",
        "may", "june", "july", "august", "september",
        "october", "november", "december"
    ]

    window.location.href = `/archives/${mapping.at(month)}_${year}.txt`;
})
