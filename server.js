const {PrismaClient} = require('@prisma/client')
const {readFile} = require("fs").promises
const path = require("path")
const express = require("express")
const helm = require("helmet")
const prisma = new PrismaClient({log: ["error"]})
const app = express()

app.use(express.static(path.join(__dirname, "static")));
app.use(helm())
app.use(express.json())
app.use(express.urlencoded())

app.get("/", async (req, res) =>{
    res.send(await readFile("./index.html", "utf-8"))
})

app.post("/submit", async (req, res) =>{
    console.log(req.body)
    prisma.$connect
    const startDate = new Date(req.body.startdate)
    // startDate.setFullYear(2024, req.body.startmonth, req.body.startday);

    const endDate = new Date(req.body.enddate)
    // endDate.setFullYear(2024, req.body.endmonth, req.body.endday);

    if(req.body.type == "delete"){
        const del = await prisma.gone.delete({
            where: {
                idGone: parseInt(req.body.idGone),
                Name: req.body.name,
                StartDate : startDate,
                EndDate: endDate
            }
        })
    }else if(req.body.type == "input"){
        console.log("input")
        console.log(req.body)
        const mac = await prisma.users.upsert({
            update: {
                gone: {
                    create: {
                        StartDate: startDate,
                        EndDate: endDate,
                        Reason: req.body.reason,
                        Colour: req.body.colour
                    }
                }
            },
            create:{
                Name: req.body.name,
                gone: {
                    create: {
                        StartDate: startDate,
                        EndDate: endDate,
                        Reason: req.body.reason,
                        Colour: req.body.colour
                    }
                }
            },
            where: {
                Name: req.body.name
            }
        })
    }

    

    res.redirect("/")
    prisma.$disconnect
})

app.get("/api/gone", async (req, res) =>{
    const gones = await prisma.gone.findMany();
    res.json(gones)
})

app.listen(3000, () => console.log("Website Online"))
