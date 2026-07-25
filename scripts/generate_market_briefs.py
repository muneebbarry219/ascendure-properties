from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "reports"
SOURCE = ROOT / "scripts" / "report-html"
EDGE = Path(r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe")

reports = [
    {
        "slug": "q2-luxury-market-report-2026",
        "label": "Q2 2026",
        "title": "Luxury Market Report",
        "subtitle": "A directional view of Saudi Arabia’s prime residential market",
        "sections": [
            ("Executive perspective", "Saudi Arabia’s luxury residential sector continues to be shaped by new destination development, expanding lifestyle infrastructure, and a more diverse international buyer base. Prime purchasers remain selective: quality, delivery certainty, access, privacy, and long-term place-making matter more than headline launches."),
            ("Demand signals", "Family-led demand favours larger layouts, turnkey specifications, privacy, and proximity to schools and lifestyle amenities. Investors are placing greater weight on service standards, recurring charges, handover risk, and realistic leasing depth."),
            ("Supply & product", "The strongest proposition is not simply scarcity. It combines a credible developer, differentiated design, durable specification, transparent service delivery, and a location with multiple demand drivers."),
            ("Investor watchlist", "Track launch-to-handover execution, competing pipeline, infrastructure milestones, resale liquidity, leasing comparables, service charges, and the ownership eligibility of the intended purchaser."),
            ("Q3 outlook", "Expect continued interest in well-governed branded residences, villas, and mixed-use communities. Pricing resilience is likely to vary sharply by micro-location and project quality; disciplined selection remains essential.")
        ]
    },
    {
        "slug": "ksa-investment-overview-2026",
        "label": "2026 EDITION",
        "title": "KSA Investment Overview",
        "subtitle": "Ownership, financing, residency, and acquisition essentials",
        "sections": [
            ("Why KSA real estate", "Vision-led development, demographic depth, tourism expansion, corporate growth, and major infrastructure investment are creating opportunities across residential, hospitality, logistics, office, and mixed-use assets."),
            ("Foreign ownership", "The updated Non-Saudi Real Estate Ownership Law has applied since 22 January 2026. Eligibility depends on the buyer category and geographical-zone controls. Legal ownership becomes effective through registration in the Real Estate Registry."),
            ("Financing reality", "The right to own and the ability to obtain financing are separate. Residents generally have broader lender access. Non-residents may face fewer options, enhanced source-of-funds checks, and larger equity requirements."),
            ("Premium Residency", "The Real Estate Owner product currently requires qualifying residential real estate valued at SAR 4 million or more, subject to programme conditions. Residency remains linked to the qualifying ownership or usufruct."),
            ("Acquisition roadmap", "Confirm eligibility and zone; appoint advisers; verify title and property compliance; agree conditional terms; secure funding; execute and register; then complete handover and operational setup.")
        ]
    },
    {
        "slug": "ksa-neighbourhood-guides-2026",
        "label": "CITY GUIDE",
        "title": "Neighbourhood Guides",
        "subtitle": "Riyadh and Jeddah: matching location to lifestyle and strategy",
        "sections": [
            ("Riyadh: north", "North Riyadh attracts families and professionals seeking newer communities, airport access, schools, retail, and proximity to expanding business corridors. Compare commute patterns, future supply, plot density, and amenity delivery."),
            ("Riyadh: central", "Central districts can offer established services, mature connectivity, and access to commercial nodes. Stock quality varies considerably, making building-level inspection and parking, access, and redevelopment analysis critical."),
            ("Jeddah: waterfront", "Corniche and waterfront locations appeal to lifestyle-led buyers, but views, access, humidity exposure, building maintenance, and service standards must be assessed property by property."),
            ("Jeddah: family districts", "Established northern neighbourhoods offer schools, retail, and residential depth. Evaluate road connectivity, nearby development, plot use, and the consistency of rental demand."),
            ("How to shortlist", "Start with intended use, travel patterns, household needs, holding period, and exit audience. Then compare ownership eligibility, total cost, liveability, delivery risk, rental evidence, and resale liquidity.")
        ]
    }
]

def page(section_title, body, number, report):
    return f"""
    <section class="page">
      <header><span>ASCENDURE</span><small>PROPERTIES</small></header>
      <div class="rule"></div>
      <p class="eyebrow">{report['label']} · MARKET INTELLIGENCE</p>
      <h2>{section_title}</h2>
      <p class="body">{body}</p>
      <div class="insight"><b>ASCENDURE VIEW</b><br>Use market evidence at the building and micro-location level. Headline narratives should support—not replace—legal, technical, and commercial due diligence.</div>
      <footer><span>Private client briefing</span><span>{number:02d}</span></footer>
    </section>"""

def html(report):
    content_pages = "".join(page(title, body, i + 2, report) for i, (title, body) in enumerate(report["sections"]))
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
    @page {{ size:A4; margin:0 }} *{{box-sizing:border-box}} body{{margin:0;font-family:Arial,sans-serif;color:#0A2540}}
    .page{{width:210mm;height:297mm;padding:20mm 18mm;position:relative;page-break-after:always;background:#f7f5ef}}
    .cover{{background:#0A2540;color:white;padding:24mm 18mm}} header{{display:flex;align-items:baseline;gap:8px;font-weight:800;letter-spacing:2px}}
    header small{{font-size:8px;color:#d6a900}} .rule{{height:2px;background:#d6a900;margin-top:8mm;width:28mm}}
    .cover .tag{{margin-top:55mm;color:#f2c94c;font-size:12px;font-weight:bold;letter-spacing:3px}} h1{{font-size:49px;line-height:1.04;margin:9mm 0 7mm;max-width:155mm}}
    .cover .subtitle{{font-size:20px;line-height:1.55;max-width:145mm;color:#dbe3eb}} .cover .note{{position:absolute;bottom:27mm;max-width:150mm;color:#aebdca;font-size:10px;line-height:1.6}}
    .eyebrow{{margin-top:32mm;color:#b28d00;font-size:11px;font-weight:bold;letter-spacing:2px}} h2{{font-size:35px;line-height:1.15;margin:8mm 0}}
    .body{{font-size:17px;line-height:1.75;max-width:165mm;color:#334e68}} .insight{{margin-top:16mm;padding:9mm;background:white;border-left:4px solid #d6a900;font-size:13px;line-height:1.7;color:#486581}}
    .insight b{{color:#0A2540;letter-spacing:1px}} footer{{position:absolute;left:18mm;right:18mm;bottom:15mm;display:flex;justify-content:space-between;border-top:1px solid #c9d2d9;padding-top:5mm;font-size:10px;color:#6b7c8d}}
    </style></head><body>
    <section class="page cover"><header><span>ASCENDURE</span><small>PROPERTIES</small></header><div class="rule"></div>
    <p class="tag">{report['label']} · MARKET BRIEF</p><h1>{report['title']}</h1><p class="subtitle">{report['subtitle']}</p>
    <p class="note">Prepared for Ascendure clients. This brief is directional market commentary, not legal, financial, tax, valuation, or investment advice. Verify all decisions with qualified advisers and current official sources. Published July 2026.</p></section>
    {content_pages}</body></html>"""

OUT.mkdir(parents=True, exist_ok=True)
SOURCE.mkdir(parents=True, exist_ok=True)
for report in reports:
    html_path = SOURCE / f"{report['slug']}.html"
    pdf_path = OUT / f"{report['slug']}.pdf"
    html_path.write_text(html(report), encoding="utf-8")
    subprocess.run([
        str(EDGE), "--headless", "--disable-gpu", "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}", html_path.as_uri()
    ], check=True)
    print(f"Created {pdf_path}")
