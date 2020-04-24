import fs, { truncateSync } from "fs";
import http from "http";
import url from "url";

function osszead(a: number, b: number): number {
    return a + b;
}

function faktorialis(n: number): number {
    let fakt: number = 1;
    for (let i = 2; i <= n; i++) {
        fakt = fakt * i;
    }
    return fakt;
}
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

        res.write("Páros-Páratlan meghatározó\n");
        res.write("x= ");
        let x: number = parseInt(params.inputx as string);
        if (isNaN(x)) {
            x = 0;
        }
        res.write(`<input type='number' name='inputx' value=${x} style='width:5em;' onChange='this.form.submit();'>\n`);
        if (x % 2 == 0) {
            res.write("A szám páros!");
        } else {
            res.write("A szám páratlan!");
        }

        res.write("KRÉTA\n");
        res.write("Kérem az osztályzatot: ");
        let jegy: number = parseInt(params.jegy as string);
        if (isNaN(jegy)) {
            jegy = 5;
        }
        res.write(`<input type='text' name='jegy' value=${jegy} style='width:5em;' onChange='this.form.submit();'>\n`);

        switch (jegy) {
            case 1:
                res.write("elégtelen\n");
                break;

            case 2:
                res.write("elégséges\n");
                break;

            case 3:
                res.write("közepes\n");
                break;

            case 4:
                res.write("jó\n");
                break;

            case 5:
                res.write("jeles\n");
                break;

            default:
                res.write("Ez nem osztályzat!");
                break;
        }

        res.write("Függvény hívása\n");
        let x1: number;
        x1 = 4;
        x1++;
        let x2: number;
        x2 = 4;
        x2--;
        const osszeg: number = osszead(x1, x2);
        res.write(`${x1}+${x2}=${osszeg}`);

        res.write("Szám faktoriálisa\n");
        res.write("Kérem az számot: ");
        let n: number = parseInt(params.n as string);
        if (isNaN(n)) {
            n = 5;
        }
        res.write(`<input type='text' name='n' value=${n} style='width:5em;' onChange='this.form.submit();'>\n`);
        res.write(`${n}!=${faktorialis(n)}`);
        res.write("\nTömbök\n");
        const nevek: string[] = ["Andi", "Anna", "Bence", "Laci"];
        res.write(nevek[0] + "\n");
        res.write(nevek[1] + "\n");
        res.write(nevek[2] + "\n");
        res.write(nevek[3] + "\n");

        res.write("visszafelé:\n");
        for (let i: number = nevek.length - 1; i >= 0; i--) {
            res.write(nevek[i] + "\n");
        }
        //bejárás tétele
        const számok: number[] = [23, 67, 33, 77, 88, 73, 21, 20];
        for (let i = 0; i < számok.length; i++) {
            res.write(`${számok[i]}, `);
        }
        res.write("\n");
        res.write(számok.toString() + "\n");
        //bejárás for of ciklussal
        for (const i of számok) {
            res.write(`${i}; `);
        }
        //for in ciklus
        for (const i in számok) {
            res.write(`${i}; `);
        }
        res.write("\n");

        for (const i in számok) {
            const utolsóIndex: number = számok.length - 1;
            if (parseInt(i) != utolsóIndex) {
                res.write(`${számok[i]}, `);
            } else {
                res.write(`${számok[i]} `);
            }
            res.write(`${i}; `);
        }
        res.write("\n");

        //Kiírás a join() függvény használatával
        res.write(számok.join(". "));

        //Szélsőérték keresés algoritmusa
        let min: number = számok[0];
        for (let i = 0; i < számok.length; i++) {
            if (számok[i] < min) {
                min = számok[i];
            }
        }
        res.write(`legkisebb elem értéke: ${min}\n`);

        let miniPáratlan: number = -1;
        for (let i = 0; i < számok.length; i++) {
            if (számok[i] % 2 == 1) {
                if (miniPáratlan == -1) {
                    miniPáratlan = i;
                } else {
                    if (számok[i] < számok[miniPáratlan]) {
                        miniPáratlan = i;
                    }
                }
            }
        }
        if (miniPáratlan != -1) {
            res.write(`A legkisebb páratlan elem értéke: ${számok[miniPáratlan]}, indexe: ${miniPáratlan}\n`);
        }

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
