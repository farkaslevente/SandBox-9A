import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Sandbox 9A</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        // let x: = 12; // változó definíció: let változóazonosító = kezdőérték
        // x = 20;
        // res.write(`Az x változó érték: ${x}\n`);
        // res.write(x.toString() + "\n");
        // const szöveg = "alma";
        // res.write(szöveg + "\n");
        // let esik: boolean;
        // esik = true;
        // res.write(`${esik}\n`);

        res.write("Téglalap területe és kerülete\n");
        res.write("a= ");
        let oldalA: number = parseInt(params.inputa as string);
        if (isNaN(oldalA)) {
            oldalA = 20;
        }
        res.write(`<input type='text' name='inputa' value=${oldalA} style='width:5em;' onChange='this.form.submit();'>\n`);

        res.write("Téglalap területe és kerülete\n");
        res.write("b= ");
        let oldalB: number = parseInt(params.inputb as string);
        if (isNaN(oldalB)) {
            oldalB = 20;
        }
        res.write(`<input type='text' name='inputa' value=${oldalB} style='width:5em;' onChange='this.form.submit();'>\n`);

        const terület = oldalA * oldalB;
        const kerület = 2 * (oldalA + oldalB);
        res.write(`Terület = ${terület}\n`);
        res.write(`Kerület = ${kerület}\n`);

        res.write(`<input type='text' name='inputa' value=${x} style='width:5em;' onChange='this.form.submit();'>\n`);
        res.write("Páros-Páratlan meghatározó\n");
        res.write("x= ");
        let x: number = parseInt(params.inputb as string);
        if (isNaN(x)) {
        x = 0;
        }
        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
