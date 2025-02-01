import fetch from "node-fetch";

export async function POST(req) {
    try {
        const url = "https://gpay.com.tr/ApiRequest";

        const body = await req.json();
        const { return_url, amount } = body;

        const data = {
            username: "vugolive",
            key: "JQzMFhfhm",
            order_id: Buffer.from(`order_${Date.now()}`).toString("base64"),
            amount: amount,
            currency: "949",
            return_url: return_url, 
            phone: "50213123213",
            selected_bank_id: "62",
            nufus_bilgileri: {
                ad_soyad: "AD SOYAD",
                tc_no: "151000000000",
                dogum_yili: "1978",
                il: "ANKARA"
            }
        };

    
        const formParams = new URLSearchParams();
        Object.keys(data).forEach(key => {
            if (typeof data[key] === "object" && !Array.isArray(data[key])) {
                Object.entries(data[key]).forEach(([subKey, value]) => {
                    formParams.append(`${key}[${subKey}]`, value);
                });
            } else if (Array.isArray(data[key])) {
                data[key].forEach((item, index) => {
                    Object.entries(item).forEach(([subKey, value]) => {
                        formParams.append(`${key}[${index}][${subKey}]`, value);
                    });
                });
            } else {
                formParams.append(key, data[key]);
            }
        });

        const response = await fetch(url, {
            method: "POST",
            body: formParams.toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" 
            }
        });

        const result = await response.json();
        console.log(result);

        if (result.state === 0) {
            return new Response(
                JSON.stringify({
                    error_code: result.error_code,
                    message: result.message
                }),
                { status: 400 }
            );
        } else {
            return new Response(
                JSON.stringify({
                    link: result.link
                }),
                { status: 200 }
            );
        }
    } catch (error) {
        console.error("Hata:", error);
        return new Response(
            JSON.stringify({ error: "Server Error", details: error.message }),
            { status: 500 }
        );
    }
}
