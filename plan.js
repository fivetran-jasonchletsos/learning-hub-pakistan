(function () {
  var PHASES = [
    { title: "Phase 1, weeks 1 to 6: Hardware, mobile and core computing", maps: "Maps to A+ Core 1: Hardware and Mobile Devices", weeks: [
      ["How computers work", "Set up a study log, a GitHub account and a notes app. Open a Jira Service Management Free site."],
      ["Cables, ports, peripherals and power", "Photograph and label every port on one laptop and one desktop."],
      ["Storage, RAM, CPU and cooling", "Open a spare PC or laptop (borrow from a repair shop if needed), identify each part and write it up."],
      ["Printers, displays and mobile devices", "Set up email on a phone and write a how-to for it."],
      ["Laptop components and BIOS/UEFI", "Boot into BIOS and record the settings. Take a Professor Messer Core 1 hardware quiz."],
      ["Hardware troubleshooting method", "Write 5 mock tickets and resolve each with the CompTIA troubleshooting steps. Checkpoint: Core 1 hardware practice exam, 75 percent or better."]
    ]},
    { title: "Phase 2, weeks 7 to 12: Operating systems and troubleshooting", maps: "Maps to A+ Core 2: Operating Systems and Software Troubleshooting", weeks: [
      ["Windows installation and editions", "Install Windows in a free virtual machine (VirtualBox or Hyper-V)."],
      ["Windows administration", "Create users and groups, use Task Manager and Event Viewer, and document the steps."],
      ["Command line: cmd and PowerShell", "Run 20 diagnostic commands (ipconfig, ping, sfc, chkdsk) and explain the output."],
      ["Linux fundamentals", "Set up an Ubuntu VM. Practice file permissions, package installs and 15 core commands."],
      ["macOS basics and software troubleshooting", "Write a runbook for the ticket 'my PC is slow'."],
      ["Backup, recovery and imaging", "Take and restore a VM snapshot. Checkpoint: Core 2 operating systems practice exam, 75 percent or better."]
    ]},
    { title: "Phase 3, weeks 13 to 18: Networking, cloud and security", maps: "Maps to A+ Core 1: Networking, Cloud. Core 2: Security", weeks: [
      ["OSI model, TCP/IP and IP addressing", "Cisco Networking Basics module 1 and a subnetting worksheet."],
      ["DHCP, DNS, ports and protocols", "Use Wireshark or nslookup to capture a DNS lookup and explain it."],
      ["Wi-Fi, routers and small office networks", "Build a Cisco Packet Tracer lab with a router and two PCs."],
      ["Cloud basics", "Work through the Microsoft Learn AZ-900 path. Create a free-tier account and add a user."],
      ["Security fundamentals", "Do the TryHackMe Pre Security rooms. Write a one-page phishing awareness handout."],
      ["Windows and mobile security", "Harden a VM using a checklist. Checkpoint: full Core 1 practice exam at 80 percent or better. Book Core 1."]
    ]},
    { title: "Phase 4, weeks 19 to 24: Service desk skills, scripting, AI tools and job search", maps: "Maps to A+ Core 2: Operational Procedures, plus job readiness", weeks: [
      ["Operational procedures, documentation and ITIL concepts", "Write 3 knowledge-base articles in Jira Service Management. Learn incident, problem, change and SLA."],
      ["Customer service writing", "Rewrite 10 poor ticket replies. Run a mock support call with your partner."],
      ["Scripting basics", "Take AI Python for Beginners. Write a script that checks disk space or lists users and commit it to GitHub. Book Core 2."],
      ["Finance software support", "Build a finance helpdesk playbook with 10 common issues (login, permissions, period lock, bank feed errors) and fixes, using Tally, Odoo or QuickBooks."],
      ["AI tools in support work", "Use an AI assistant to draft replies, summarize tickets and explain error logs. Document 5 prompts and compare with human answers. Never paste private customer data. Publish the portfolio and update your resume and LinkedIn."],
      ["Interview preparation", "Practice STAR answers and troubleshooting scenarios. Do a mock interview with each other. Apply to at least 10 roles. Final checkpoint: A+ passed or booked, portfolio with 6 or more items, 3 mock interviews done."]
    ]}
  ];

  var root = document.getElementById("plan");
  var learner = localStorage.getItem("hub.learner") || "A";
  function key(l) { return "hub.plan." + l; }
  function load() { try { return JSON.parse(localStorage.getItem(key(learner))) || {}; } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(key(learner), JSON.stringify(s)); } catch (e) {} }

  function render() {
    var state = load(), n = 0, total = 0, html = "";
    PHASES.forEach(function (p) {
      html += "<h2>" + p.title + "</h2><p class='muted'>" + p.maps + "</p>";
      p.weeks.forEach(function (w) {
        n++; total++;
        var done = !!state[n];
        html += "<div class='week" + (done ? " done" : "") + "'><input type='checkbox' id='w" + n + "' data-n='" + n + "'" + (done ? " checked" : "") + ">" +
          "<label for='w" + n + "'><span class='wt'>Week " + n + ": " + w[0] + "</span><br><span class='task'>" + w[1] + "</span></label></div>";
      });
    });
    root.innerHTML = html;
    var d = Object.keys(state).filter(function (k) { return state[k]; }).length;
    document.getElementById("barfill").style.width = Math.round(d / total * 100) + "%";
    document.getElementById("count").textContent = d + " of " + total + " weeks complete";
    document.querySelectorAll("#who button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === learner); });
  }

  root.addEventListener("change", function (e) {
    if (!e.target.dataset.n) return;
    var s = load(); s[e.target.dataset.n] = e.target.checked; save(s); render();
  });
  document.getElementById("who").addEventListener("click", function (e) {
    if (!e.target.dataset.l) return;
    learner = e.target.dataset.l; localStorage.setItem("hub.learner", learner); render();
  });
  render();
})();
