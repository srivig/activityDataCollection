
var lce_lang = {
  weekname: "week",
  longDaysInWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  short2DaysInWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  short3DaysInWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  shortMonthsInYear: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  longMonthsInYear: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
(function(a) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], a);
  } else {
    if (typeof exports === "object") {
      module.exports = a;
    } else {
      a(jQuery);
    }
  }
}(function(b) {
  var c = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
    h = ("onwheel" in document || document.documentMode >= 9) ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
    f = Array.prototype.slice,
    g, a;
  if (b.event.fixHooks) {
    for (var d = c.length; d;) {
      b.event.fixHooks[c[--d]] = b.event.mouseHooks;
    }
  }
  b.event.special.mousewheel = {
    version: "3.1.6",
    setup: function() {
      if (this.addEventListener) {
        for (var k = h.length; k;) {
          this.addEventListener(h[--k], j, false);
        }
      } else {
        this.onmousewheel = j;
      }
    },
    teardown: function() {
      if (this.removeEventListener) {
        for (var k = h.length; k;) {
          this.removeEventListener(h[--k], j, false);
        }
      } else {
        this.onmousewheel = null;
      }
    }
  };
  b.fn.extend({
    mousewheel: function(i) {
      return i ? this.bind("mousewheel", i) : this.trigger("mousewheel");
    },
    unmousewheel: function(i) {
      return this.unbind("mousewheel", i);
    }
  });

  function j(o) {
    var n = o || window.event,
      m = f.call(arguments, 1),
      p = 0,
      l = 0,
      k = 0,
      i = 0;
    o = b.event.fix(n);
    o.type = "mousewheel";
    if ("detail" in n) {
      k = n.detail * -1;
    }
    if ("wheelDelta" in n) {
      k = n.wheelDelta;
    }
    if ("wheelDeltaY" in n) {
      k = n.wheelDeltaY;
    }
    if ("wheelDeltaX" in n) {
      l = n.wheelDeltaX * -1;
    }
    if ("axis" in n && n.axis === n.HORIZONTAL_AXIS) {
      l = k * -1;
      k = 0;
    }
    p = k === 0 ? l : k;
    if ("deltaY" in n) {
      k = n.deltaY * -1;
      p = k;
    }
    if ("deltaX" in n) {
      l = n.deltaX;
      if (k === 0) {
        p = l * -1;
      }
    }
    if (k === 0 && l === 0) {
      return;
    }
    i = Math.max(Math.abs(k), Math.abs(l));
    if (!a || i < a) {
      a = i;
    }
    p = Math[p >= 1 ? "floor" : "ceil"](p / a);
    l = Math[l >= 1 ? "floor" : "ceil"](l / a);
    k = Math[k >= 1 ? "floor" : "ceil"](k / a);
    o.deltaX = l;
    o.deltaY = k;
    o.deltaFactor = a;
    m.unshift(o, p, l, k);
    if (g) {
      clearTimeout(g);
    }
    g = setTimeout(e, 200);
    return (b.event.dispatch || b.event.handle).apply(this, m);
  }

  function e() {
    a = null;
  }
}));
(function(a) {
  a.fn.extend({
    disableSelection: function() {
      this.each(function() {
        this.onselectstart = function() {
          return false;
        };
        this.unselectable = "on";
        a(this).css({
          "-moz-user-select": "none",
          "-khtml-user-select": "none",
          "-webkit-user-select": "none",
          "-o-user-select": "none",
          "user-select": "none"
        });
      });
    },
    enableSelection: function() {
      this.each(function() {
        this.onselectstart = function() {};
        this.unselectable = "off";
        a(this).css({
          "-moz-user-select": "auto",
          "-khtml-user-select": "auto",
          "-webkit-user-select": "auto",
          "-o-user-select": "auto",
          "user-select": "auto"
        });
      });
    }
  });
})(jQuery);
(function(a) {
  a.fn.diaryEvents = function(e) {
    var b = {
      init: function(f) {
        this.diaryEvents.settings = a.extend({}, this.diaryEvents.defaults, f);
        return this.each(function() {
          var n = a(this),
            w = this;
          d.main = a(this);
          var u = null,
            z = null,
            r = null,
            m = null,
            I = null;
          var V = false;
          var E, o, q, P = false;
          var j = 0,
            s = 0,
            l = 0;
          var Q, A, L;
          var J = false;
          var h = false;
          var S;
          var H = false,
            v = false;
          d.main.css({
            position: "absolute",
            overflow: "hidden",
            height: "auto",
            padding: 0
          });
          var K = a("<div>", {
            id: "lcelb"
          });
          K.disableSelection();
          K.appendTo(d.main);
          K = a("<div>", {
            id: "lcerb"
          });
          K.disableSelection();
          K.appendTo(d.main);
          d.main.find("#lcelb").css({
            "float": "none",
            position: "absolute",
            "z-index": 1,
            left: -1
          });
          d.main.find("#lcerb").css({
            "float": "none",
            position: "absolute",
            "z-index": 1,
            right: -1
          });
          if (d.main.diaryEvents.settings.showScroll) {
            K = a("<div>", {
              id: "lcescrollcontainer"
            });
            K.appendTo(d.main);
            d.scrl_ct = K;
            d.scrl_ct.css({
              position: "relative"
            });
          }
          K = a("<div>", {
            id: "lcetape"
          });
          var i = '<table width="100%" cellpadding="0" cellspacing="0" style="height: 100%">' + ((d.main.diaryEvents.settings.showMonthYear) ? '<tr><td><div id="lcemonths"></div></td></tr>' : "") + '<tr><td><div id="lcedays"></div></td></tr>' + ((d.main.diaryEvents.settings.showNumberOfWeek) ? '<tr><td><div id="lceweeks"></div></td></tr>' : "") + "</table>";
          K.append(i);
          K.appendTo(d.main);
          d.line = K;
          d.line.css({
            position: "relative",
            width: "100%",
            overflow: "hidden"
          });
          d.main.find("#lcedays").css({
            position: "relative",
            left: 0,
            margin: 0,
            padding: 0
          });
          if (d.main.diaryEvents.settings.showNumberOfWeek) {
            d.main.find("#lceweeks").css({
              position: "relative",
              left: 0,
              margin: 0,
              padding: 0
            });
          }
          if (d.main.diaryEvents.settings.showMonthYear) {
            d.main.find("#lcemonths").css({
              position: "relative",
              left: 0
            });
          }
          var O = true;
          var Z = true;
          for (var U = -d.main.diaryEvents.settings.lcesize; U <= d.main.diaryEvents.settings.lcesize; U++) {
            var p = d.main.diaryEvents.settings.nowdate;
            p = c.dateIncrement(p, U);
            u = null;
            u = a("<div>", {
              id: "lceditem"
            });
            if (d.main.diaryEvents.settings.showDayOfWeek) {
              z = a("<div>", {
                id: "lcedcapt"
              });
            }
            r = a("<div>", {
              id: "lcedbody"
            });
            r.css({
              position: "relative"
            });
            u.disableSelection();
            if (d.main.diaryEvents.settings.showDayOfWeek) {
              z.disableSelection();
            }
            r.disableSelection();
            if (p.getDay() == d.main.diaryEvents.settings.firstday) {
              V = !V;
            }
            if (U == 0) {
              if (d.main.diaryEvents.settings.showDayOfWeek) {
                z.addClass("nowdate");
              }
              r.addClass("nowdate");
            } else {
              if (d.main.diaryEvents.settings.showDayOfWeek) {
                z.removeClass("nowdate");
              }
              r.removeClass("nowdate");
            }
            if (V) {
              if (d.main.diaryEvents.settings.showDayOfWeek) {
                z.addClass("newweek");
              }
              r.addClass("newweek");
            } else {
              if (d.main.diaryEvents.settings.showDayOfWeek) {
                z.removeClass("newweek");
              }
              r.removeClass("newweek");
            }
            if ((p.getDay() == 0) || (p.getDay() == 6)) {
              if (d.main.diaryEvents.settings.showDayOfWeek) {
                z.addClass("weekend");
              }
              r.addClass("weekend");
            } else {
              if (d.main.diaryEvents.settings.showDayOfWeek) {
                z.removeClass("weekend");
              }
              r.removeClass("weekend");
            }
            if (d.main.diaryEvents.settings.showDayOfWeek) {
              z.html(c.getDayOfWeekx2(p));
            }
            var Y = p.getFullYear() + "" + c.dig2x(p.getMonth() + 1) + "" + c.dig2x(p.getDate());
            var aa = c.findEvents(Y, d.main.diaryEvents.settings.events);
            var y = c.findEvents(Y, d.main.diaryEvents.settings.links);
            var G = a("<div>", {});
            G.css({
              position: "relative",
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
              display: "table",
              height: "100%",
              width: "100%"
            });
            G.html('<span id="lcedval" style="display:table-cell; vertical-align:middle;">' + p.getDate() + "</span>");
            r.append(a(G));
            if (y.length > 0) {
              r.addClass("iseventday");
            }
            if ((aa.length > 0) && (y.length == 0)) {
              G = a("<div>", {
                id: "lcedshortcut"
              });
              var D = c.getShortCutColor(Y);
              if (D != "") {
                G.css({
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  "border-bottom": "8px solid " + D
                });
              } else {
                G.css({
                  position: "absolute",
                  bottom: 0,
                  right: 0
                });
              }
              G.html('<img src="images/1px.gif" width="1" height="1" alt="" />');
              r.append(a(G));
              r.addClass("iseventday");
            }
            if (d.main.diaryEvents.settings.showDayOfWeek) {
              u.append(a(z));
            }
            u.append(a(r));
            u.addClass(Y);
            u.css({
              display: "inline-block",
              "float": "left"
            });
            d.main.find("#lcedays").append(a(u));
            u.on("mousemove", function() {
              a(this).children("div").addClass("activeitem");
            });
            u.on("mouseout", function() {
              a(this).children("div").removeClass("activeitem");
            });
            u.on("touchstart", function(t) {
              h = true;
              setTimeout(function() {
                h = false;
              }, 300);
            });
            u.on("touchend", function() {
              if (h) {
                M(a(this));
              }
            });
            u.on("mousedown", function(t) {
              h = true;
              setTimeout(function() {
                h = false;
              }, 300);
            });
            u.on("mouseup", function() {
              if (h) {
                M(a(this));
              }
            });

            function M(t) {
              c.showEventsDescription(d.main, t);
            }
            if (d.main.diaryEvents.settings.showMonthYear) {
              if (p.getDate() == 1) {
                m = null;
                m = a("<div>", {
                  id: "lcemitem"
                });
                m.css({
                  position: "relative",
                  "float": "left",
                  padding: 0,
                  margin: 0,
                  height: "auto",
                  overflow: "hidden",
                  "white-space": "nowrap"
                });
                m.attr("class", "m" + u.attr("class"));
                if (Z) {
                  m.addClass("newmonth");
                }
                if (j == 0) {
                  if (l != 0) {
                    var N = a("<div>", {
                      id: "lcemitem"
                    });
                    if (!Z) {
                      N.addClass("newmonth");
                    }
                    N.css({
                      position: "relative",
                      "float": "left",
                      padding: 0,
                      margin: 0,
                      height: "auto"
                    });
                    N.append('<img src="images/1px.gif" width="1" height="1" alt="" />');
                    d.main.find("#lcemonths").append(a(N));
                  }
                }
                if (Z) {
                  Z = false;
                } else {
                  Z = true;
                }
                var C = a("<div>", {
                  id: "lcemcapt"
                });
                C.html(d.main.diaryEvents.settings.language.shortMonthsInYear[p.getMonth()] + " " + p.getFullYear());
                C.css({
                  display: "inline-block"
                });
                m.append(a(C));
                d.main.find("#lcemonths").append(a(m));
                j += m.outerWidth(true);
              }
            }
            if (d.main.diaryEvents.settings.showNumberOfWeek) {
              if (p.getDay() == d.main.diaryEvents.settings.firstday) {
                I = null;
                I = a("<div>", {
                  id: "lcewitem"
                });
                var g = c.getWeekNumber(p.toString(), d.main.diaryEvents.settings.firstday);
                I.css({
                  position: "relative",
                  "float": "left",
                  padding: 0,
                  margin: 0,
                  height: "auto",
                  overflow: "hidden",
                  "white-space": "nowrap"
                });
                I.addClass("w" + u.attr("class"));
                if (O) {
                  I.addClass("newweek");
                }
                if (s == 0) {
                  if (l != 0) {
                    var X = a("<div>", {
                      id: "lcewitem"
                    });
                    if (!O) {
                      X.addClass("newweek");
                    }
                    X.css({
                      position: "relative",
                      "float": "left"
                    });
                    X.append('<img src="images/1px.gif" width="1" height="1" alt="" />');
                    d.main.find("#lceweeks").append(a(X));
                  }
                }
                if (O) {
                  O = false;
                } else {
                  O = true;
                }
                var W = a("<div>", {
                  id: "lcewcapt"
                });
                if ((p.getMonth() == 11) && ((p.getDate() + 6) > 31)) {
                  W.html("53-1 " + d.main.diaryEvents.settings.language.weekname);
                } else {
                  W.html(g + " " + d.main.diaryEvents.settings.language.weekname);
                }
                W.css({
                  display: "inline-block"
                });
                I.append(a(W));
                d.main.find("#lceweeks").append(a(I));
                s += I.outerWidth(true);
              }
            }
            l += u.outerWidth(true);
            m = null;
            I = null;
            z = null;
            r = null;
            u = null;
          }
          d.emsg = a("<div>", {
            id: "lceevents"
          });
          d.emsg.css({
            display: "none",
            position: "absolute",
            "z-index": "8",
            width: "25%",
            color: "red"
          });
          d.emsgshortcut = a("<div>", {
            id: "lceevntshortcut"
          });
          d.emsgshortcut.css({
            display: "none",
            position: "absolute",
            "z-index": "6",
            height: 15,
            width: 30,
            "background-position": "top left",
            "background-repeat": "no-repeat",
            "background-size": "contain"
          });
          d.main.after(a(d.emsgshortcut));
          d.main.after(a(d.emsg));
          d.line.width(d.main.find("div#lceditem").outerWidth(true) * (d.main.find("div#lcedays > div#lceditem").length + 100));
          if (d.main.diaryEvents.settings.showScroll) {
            d.scrl = a("<div>", {
              id: "lcescroller"
            });
            d.scrl.append('<img src="images/1px.gif" width="1" height="1" alt="" />');
            d.scrl.width((d.scrl_ct.width() * d.main.width()) / d.line.outerWidth());
            d.scrl_ct.append(a(d.scrl));
            d.scrl.css({
              "float": "left",
              position: "relative"
            });
          }

          function T() {
            var ah = 0,
              aj = 0,
              ae = 0;
            var t = null,
              af = null,
              ad = null;
            var ag = "",
              ac = "",
              ai = "";
            d.main.find("div#lcedays > div#lceditem").each(function(am) {
              t = null;
              ag = a(this).attr("class");
              t = d.main.find("div#lcewitem.w" + ag);
              af = d.main.find("div#lcemitem.m" + ag);
              if (a(af).length > 0) {
                if (aj == 0) {
                  af.prev().height(af.height());
                }
                af.prev().width(a(this).position().left - aj);
                aj = a(this).position().left;
                ai = ag;
              }
              if (a(t).length > 0) {
                t.prev().width(a(this).position().left - ah);
                ah = a(this).position().left;
                ac = ag;
              }
              if (a(ad).length > 0) {
                if (a(this).position().left != 0) {
                  ae += a(this).position().left - ad.position().left;
                }
              }
              ad = a(this);
            });
            ae += ad.outerWidth(true);
            t = d.main.find("div#lcewitem.w" + ac);
            t.width(ad.position().left + ad.outerWidth(true) - ah);
            af = d.main.find("div#lcemitem.m" + ai);
            af.width(ad.position().left + ad.outerWidth(true) - aj);
            d.line.width(ae + 1);
            var ab = d.main.diaryEvents.settings.nowdate;
            var al = ab.getFullYear() + "" + c.dig2x(ab.getMonth() + 1) + "" + c.dig2x(ab.getDate());
            var ak = d.main.find("div#lceditem." + al);
            S = (-1) * ((ak.position().left + (ak.outerWidth(true) / 2)) - (d.main.innerWidth() / 2));
            d.main.find("#lcerb").height(d.line.outerHeight(true));
            d.main.find("#lcelb").height(d.line.outerHeight(true));
            d.line.css("left", (((d.main.innerWidth() - d.line.outerWidth()) * c.percent_position) / 100));
            if (d.main.diaryEvents.settings.showScroll) {
              d.scrl.width((d.scrl_ct.innerWidth() * d.main.innerWidth()) / d.line.outerWidth(true));
              d.scrl.css("left", (((d.scrl_ct.innerWidth() - d.scrl.outerWidth()) * c.percent_position) / 100));
            }
          }
          T();
          a(window).bind("resize", function() {
            d.line.width(d.main.find("div#lceditem").outerWidth(true) * (d.main.find("div#lcedays > div#lceditem").length + 100));
            clearTimeout(o);
            o = setTimeout(T, 200);
          });
          d.line.disableSelection();
          if (d.main.diaryEvents.settings.showScroll) {
            d.scrl.disableSelection();
          }

          function F() {
            if (!d.main.diaryEvents.settings.returntonow) {
              return;
            }
            if (!H) {
              return;
            }
            if (d.main.diaryEvents.settings.showScroll) {
              E = setTimeout(function() {
                d.line.animate({
                  left: S
                }, {
                  duration: 1000,
                  step: function(t, ab) {
                    d.scrl.css("left", (((d.scrl_ct.innerWidth() - d.scrl.outerWidth()) * (Math.abs(d.line.position().left * 100) / (d.line.outerWidth() - d.main.innerWidth()))) / 100));
                  }
                });
              }, d.main.diaryEvents.settings.returndelay);
            } else {
              E = setTimeout(function() {
                d.line.animate({
                  left: S
                }, 1000);
              }, d.main.diaryEvents.settings.returndelay);
            }
            q = setTimeout(function() {
              if (d.emsg.css("display") != "none") {
                c.hideEventsDescription(300);
              }
            }, 1500);
          }

          function B(ac, ab) {
            if (d.emsg.css("display") != "none") {
              c.hideEventsDescription(300);
            }
            var t = 0;
            if ((ac + ab) < (d.main.innerWidth() - d.line.outerWidth())) {
              d.line.css("left", (d.main.innerWidth() - d.line.outerWidth()));
              t = 100;
            } else {
              if ((ac + ab) > 0) {
                d.line.css("left", 0);
                t = 0;
              } else {
                d.line.css("left", (ac + ab));
                t = Math.abs((ac + ab) * 100) / (d.line.outerWidth() - d.main.innerWidth());
              }
            }
            c.percent_position = t;
            if (d.main.diaryEvents.settings.showScroll) {
              d.scrl.css("left", (((d.scrl_ct.innerWidth() - d.scrl.outerWidth()) * t) / 100));
            }
          }

          function R(ab, ac) {
            if (c.hintShowed) {
              c.hideEventsDescription(300);
            }
            var t = 0;
            if ((ab + ac) > (d.scrl_ct.innerWidth() - d.scrl.outerWidth())) {
              d.scrl.css("left", (d.scrl_ct.innerWidth() - d.scrl.outerWidth()));
              t = 100;
            } else {
              if ((ab + ac) < 0) {
                d.scrl.css("left", 0);
                t = 0;
              } else {
                d.scrl.css("left", (ab + ac));
                t = ((ab + ac) * 100) / (d.scrl_ct.innerWidth() - d.scrl.outerWidth());
              }
            }
            d.line.css("left", (((d.main.innerWidth() - d.line.outerWidth()) * t) / 100));
            c.percent_position = t;
          }
          B(S, 0);
          d.line.on("touchstart", function(t) {
            var ab = t.originalEvent.touches[0];
            L = ab.pageX;
            Q = Math.floor(d.line.position().left);
            d.line.stop(true, false).clearQueue();
            clearTimeout(E);
            clearTimeout(q);
            d.line.on("touchmove", function(ac) {
              var ae = ac.originalEvent.touches[0];
              var ad = ae.pageX - L;
              clearTimeout(E);
              clearTimeout(q);
              B(Q, ad);
            });
            event.stopPropagation();
            event.preventDefault();
          });
          d.line.on("touchend", function(t) {
            d.line.off("touchmove");
            F();
          });
          if (d.main.diaryEvents.settings.showScroll) {
            d.scrl.on("touchstart", function(t) {
              var ab = t.originalEvent.touches[0];
              L = ab.pageX;
              A = d.scrl.position().left;
              d.scrl.stop(true, false).clearQueue();
              clearTimeout(E);
              clearTimeout(q);
              d.scrl.on("touchmove", function(ac) {
                var ae = ac.originalEvent.touches[0];
                var ad = ae.pageX - L;
                clearTimeout(E);
                clearTimeout(q);
                R(A, ad);
              });
              event.stopPropagation();
              event.preventDefault();
            });
            d.scrl.on("touchend", function(t) {
              d.scrl.off("touchmove");
              F();
            });
          }
          var k = function(t) {
            var ab = t.pageX - L;
            B(Q, ab);
          };
          var x = function(t) {
            var ab = t.pageX - L;
            R(A, ab);
          };
          d.line.on("mousedown", function(t) {
            L = t.pageX;
            Q = Math.floor(d.line.position().left);
            a(document).on("mousemove", k);
          });
          a(document).on("mouseup", function() {
            if (v) {
              v = false;
            }
            a(document).off("mousemove", k);
            a(document).off("mousemove", x);
            d.scrl_Clicked = false;
            if (d.main.diaryEvents.settings.showScroll) {
              d.scrl.removeClass("activeitem");
            }
          });
          d.line.on("mousewheel", function(ab) {
            Q = Math.floor(d.line.position().left);
            var t = ab.deltaY * ab.deltaFactor * 10;
            if (Math.abs(t) > 150) {
              if (t < 0) {
                t = -150;
              } else {
                t = 150;
              }
            }
            B(Q, t);
          });
          if (d.main.diaryEvents.settings.showScroll) {
            d.scrl.on("mousedown", function(t) {
              L = t.pageX;
              A = Math.floor(d.scrl.position().left);
              d.scrl_Clicked = true;
              a(this).addClass("activeitem");
              a(document).on("mousemove", x);
            });
            d.scrl_ct.on("mousemove", function() {
              a(this).children("div").addClass("activeitem");
            });
            d.scrl_ct.on("mouseout", function(t) {
              if (!d.scrl_Clicked) {
                a(this).children("div").removeClass("activeitem");
              }
            });
            d.scrl_ct.on("mouseover", function(t) {
              d.scrl.addClass("activeitem");
            });
            d.scrl_ct.on("mousewheel", function(t) {
              A = Math.floor(d.scrl.position().left);
              var ab = t.deltaY * t.deltaFactor * 10;
              if (Math.abs(ab) > 100) {
                if (ab < 0) {
                  ab = -100;
                } else {
                  ab = 100;
                }
              }
              R(A, ab * (-1));
            });
          }
          d.main.on({
            mouseenter: function(t) {
              d.main.data("hovering", true);
            },
            mouseleave: function(t) {
              d.main.data("hovering", false);
            }
          });
          jQuery.expr[":"].hovering = function(t) {
            return a(t).data("hovering") ? true : false;
          };
          d.main.on("mousemove", function() {
            if (H) {
              H = false;
              d.line.stop(true, false).clearQueue();
              clearTimeout(E);
              clearTimeout(q);
            }
          });
          d.main.on("mouseover", function() {
            if (H) {
              H = false;
              d.line.stop(true, false).clearQueue();
              clearTimeout(E);
              clearTimeout(q);
            }
          });
          d.main.on("mousewheel", function(t, ab) {
            if (H) {
              H = false;
              d.line.stop(true, false).clearQueue();
              clearTimeout(E);
              clearTimeout(q);
            }
            t.preventDefault();
          });
          d.main.on("mouseout", function() {
            if (!H && !v) {
              H = true;
              F();
            }
          });
          d.main.on("mousedown", function() {
            if (H) {
              H = false;
              d.line.stop(true, false).clearQueue();
              clearTimeout(E);
              clearTimeout(q);
            }
            if (!v) {
              v = true;
            }
          });
          d.main.on("mouseup", function() {
            if (H) {
              H = false;
              d.line.stop(true, false).clearQueue();
              clearTimeout(E);
              d.emsg.stop(true, false).clearQueue();
              d.emsg.css("opacity", 1);
              clearTimeout(q);
            }
            if (v) {
              v = false;
            }
          });
          a(document).on("mouseup", function() {
            if (!H && !v && (!d.main.is(":hovering")) && (!P)) {
              H = true;
              F();
            }
          });
          d.emsg.on("mousemove", function() {
            if (H) {
              H = false;
              d.line.stop(true, false).clearQueue();
              clearTimeout(E);
              d.emsg.stop(true, false).clearQueue();
              d.emsg.css("opacity", 1);
              clearTimeout(q);
            }
          });
          d.emsg.on("mouseover", function() {
            if (H) {
              H = false;
              d.line.stop(true, false).clearQueue();
              clearTimeout(E);
              d.emsg.stop(true, false).clearQueue();
              d.emsg.css("opacity", 1);
              clearTimeout(q);
            }
          });
          d.emsg.on("mouseout", function() {
            if (!H && !v) {
              H = true;
              F();
            }
          });
          d.emsg.on("mouseup", function() {
            if (H) {
              H = false;
              d.line.stop(true, false).clearQueue();
              clearTimeout(E);
              d.emsg.stop(true, false).clearQueue();
              d.emsg.css("opacity", 1);
              clearTimeout(q);
            }
            P = true;
            setTimeout(function() {
              P = false;
            }, 100);
          });
        });
      }
    };
    var d = {
      main: null,
      scrl: null,
      scrl_ct: null,
      line: null,
      emsg: null,
      emsgshortcut: null
    };
    var c = {
      percent_position: 0,
      hintShowed: false,
      getShortCutColor: function(j) {
        var f = c.findEvents(j, d.main.diaryEvents.settings.events);
        var h = "";
        if (f.length != 0) {
          f.sort(c.SortByTime);
          for (var g = 0; g < f.length; g++) {
            if (!c.isNullOrUndefined(f[g].sc_color)) {
              if (f[g].sc_color != "") {
                h = f[g].sc_color;
              }
            }
          }
        }
        return h;
      },
      hideEventsDescription: function(f) {
        d.emsg.stop(true, false).clearQueue();
        d.emsg.animate({
          opacity: 0
        }, {
          duration: f,
          step: function(g) {
            d.emsgshortcut.css({
              opacity: g
            });
          },
          complete: function() {
            d.emsg.attr("class", "");
            d.emsg.css({
              display: "none"
            });
            d.emsgshortcut.css({
              display: "none"
            });
            c.hintShowed = false;
          }
        });
      },
      showEventsDescription: function(h, f) {
        function g(s, j, l) {
          s.empty();
          var p = c.findEvents(a(l).attr("class"), d.main.diaryEvents.settings.links);
          if (p.length != 0) {
            if (c.isNullOrUndefined(p[0].newwindow)) {
              location.href = p[0].href;
            } else {
              if (p[0].newwindow == true) {
                window.open(p[0].href);
              } else {
                location.href = p[0].href;
              }
            }
            return;
          }
          var m = c.findEvents(a(l).attr("class"), d.main.diaryEvents.settings.events);
          var r = false;
          if (m.length != 0) {
            m.sort(c.SortByTime);
            for (var n = 0; n < m.length; n++) {
              var q = a("<div>", {
                id: "lceevntitem"
              });
              var o = c.isNullOrUndefined(m[n].time) ? "" : '<span class="etime">' + m[n].time + "</span>";
              if (c.isNullOrUndefined(m[n].href)) {
                q.append(a("<div>", {
                  id: "lceevntcapt"
                }).html(o + '<span class="ecapt">' + m[n].title + "</span>"));
                if (!c.isNullOrUndefined(m[n].description)) {
                  q.append(a("<div>", {
                    id: "lceevnttext"
                  }).html(m[n].description));
                }
              } else {
                if (c.isNullOrUndefined(m[n].newwindow)) {
                  q.append(a("<div>", {
                    id: "lceevntcapt"
                  }).html(o + '<span class="ecapt"><a href="' + m[n].href + '" onclick="return false">' + m[n].title + "</a></span>"));
                } else {
                  if (m[n].newwindow == true) {
                    q.append(a("<div>", {
                      id: "lceevntcapt"
                    }).html(o + '<span class="ecapt"><a href="' + m[n].href + '" target="_blank" onclick="return false">' + m[n].title + "</a></span>"));
                  } else {
                    q.append(a("<div>", {
                      id: "lceevntcapt"
                    }).html(o + '<span class="ecapt"><a href="' + m[n].href + '" onclick="return false">' + m[n].title + "</a></span>"));
                  }
                }
              }
              if (m.length > 1) {
                if (c.isNullOrUndefined(m[n].href)) {
                  a(q).find("#lceevntcapt").on("click", function() {
                    k(a(this));
                  });
                  a(q).find("#lceevntcapt").on("touchstart", function(i) {
                    r = true;
                    setTimeout(function() {
                      r = false;
                    }, 300);
                  });
                  a(q).find("#lceevntcapt").on("touchend", function() {
                    if (r) {
                      k(a(this));
                    }
                  });

                  function k(i) {
                    if (a(i).next("#lceevnttext").hasClass("activeitem")) {
                      return;
                    }
                    d.emsg.children("div").find("#lceevnttext").hide("fast").removeClass("activeitem");
                    a(i).next("#lceevnttext").show("fast").addClass("activeitem");
                    d.emsg.children("div").find("#lceevntcapt").css("border-bottom", "");
                    d.emsg.children("div").find("#lceevntcapt").last().css("border-bottom", "none");
                    a(i).css("border-bottom", "none");
                  }
                } else {
                  if (c.isNullOrUndefined(m[n].newwindow)) {
                    a(q).find("#lceevntcapt").on("click", function() {
                      location.href = a(this).find("a").attr("href");
                    });
                  } else {
                    if (m[n].newwindow == true) {
                      a(q).find("#lceevntcapt").on("click", function() {
                        window.open(a(this).find("a").attr("href"));
                      });
                    } else {
                      a(q).find("#lceevntcapt").on("click", function() {
                        location.href = a(this).find("a").attr("href");
                      });
                    }
                  }
                }
              }
              if (n > 0) {
                a(q).find("#lceevnttext").hide().removeClass("activeitem");
              }
              if (n == 0) {
                a(q).find("#lceevnttext").show().addClass("activeitem");
                a(q).find("#lceevntcapt").css("border-bottom", "none");
              }
              if (n >= (m.length - 1)) {
                a(q).find("#lceevntcapt").css("border-bottom", "none");
              }
              s.append(q);
            }
            return true;
          }
          return false;
        }
        if (c.hintShowed) {
          if (d.emsg.hasClass(a(f).attr("class"))) {
            return;
          }
          d.emsg.stop(true, false).clearQueue();
          d.emsg.animate({
            opacity: 0
          }, {
            duration: 150,
            step: function(i) {
              d.emsgshortcut.css({
                opacity: i
              });
            },
            complete: function() {
              d.emsg.attr("class", "");
              c.hintShowed = false;
              if (g(d.emsg, this, f)) {
                d.emsgshortcut.css({
                  display: "inline",
                  top: d.main.position().top + d.main.outerHeight(true) + 2,
                  left: Math.floor(d.main.position().left) + (Math.floor(a(f).position().left) + Math.floor(d.line.position().left)) - ((d.emsgshortcut.width() / 2) - (a(f).outerWidth(true) / 2))
                });
                d.emsg.css({
                  display: "inline",
                  top: d.main.position().top + d.main.outerHeight(true) + d.emsgshortcut.height(),
                  left: Math.floor(d.main.position().left) + (Math.floor(a(f).position().left) + Math.floor(d.line.position().left)) - ((d.emsg.outerWidth(true) / 2) - (a(f).outerWidth(true) / 2))
                });
                d.emsg.attr("class", a(f).attr("class"));
                d.emsg.animate({
                  opacity: 1
                }, {
                  duration: 150,
                  step: function(i) {
                    d.emsgshortcut.css({
                      opacity: i
                    });
                  },
                  complete: function() {
                    c.hintShowed = true;
                  }
                });
              }
            }
          });
        } else {
          d.emsg.stop(true, false).clearQueue();
          if (g(d.emsg, this, f)) {
            d.emsgshortcut.css({
              display: "inline",
              top: d.main.position().top + d.main.outerHeight(true) + 2,
              left: Math.floor(d.main.position().left) + (Math.floor(a(f).position().left) + Math.floor(d.line.position().left)) - ((d.emsgshortcut.width() / 2) - (a(f).outerWidth(true) / 2))
            });
            d.emsg.css({
              display: "inline",
              top: d.main.position().top + d.main.outerHeight(true) + d.emsgshortcut.height(),
              left: Math.floor(d.main.position().left) + (Math.floor(a(f).position().left) + Math.floor(d.line.position().left)) - ((d.emsg.outerWidth(true) / 2) - (a(f).outerWidth(true) / 2))
            });
            d.emsg.attr("class", a(f).attr("class"));
            d.emsg.animate({
              opacity: 1
            }, {
              duration: 150,
              step: function(i) {
                d.emsgshortcut.css({
                  opacity: i
                });
              },
              complete: function() {
                c.hintShowed = true;
              }
            });
          }
        }
      },
      findEvents: function(h, f) {
        var g = a.grep(f, function(i) {
          return i.date == h;
        });
        return g;
      },
      parseEvents: function() {
        for (var f = 0; f < a(this).diaryEvents.settings.events.length; f++) {
          fastFindEvents.push(a(this).diaryEvents.settings.events[f].date);
        }
      },
      parseTime: function(k) {
        var g = a.trim(k);
        var j = "",
          f = "";
        if (!(c.isNullOrUndefined(g))) {
          var i = new Array();
          var h = /^(\d{1,2})(\.|\:){1}(\d{1,2})$/gi;
          i = h.exec(g);
          if (c.isNullOrUndefined(i)) {
            return "";
          }
          if (i.length > 0) {
            if (parseInt(i[1]) >= 23) {
              i[1] = 23;
            } else {
              if (parseInt(i[1]) <= 0) {
                i[1] = 0;
              }
            }
            if (parseInt(i[3]) >= 59) {
              i[3] = 59;
            } else {
              if (parseInt(i[3]) <= 0) {
                i[3] = 0;
              }
            }
            if (parseInt(i[1]) < 10) {
              f = "0" + parseInt(i[1]);
            }
            if (parseInt(i[3]) < 10) {
              j = "0" + parseInt(i[3]);
            }
          } else {
            return "";
          }
        }
        g = f + ":" + j;
        return g;
      },
      SortByTime: function(h, f) {
        var i = 0;
        var g = 0;
        if (c.isNullOrUndefined(h.time)) {
          i = 0;
        } else {
          if (c.parseTime(h.time) != "") {
            i = parseInt(String(h.time).substr(0, 2) + String(h.time).substr(3, 2));
          } else {
            i = 0;
          }
        }
        if (c.isNullOrUndefined(f.time)) {
          g = 0;
        } else {
          if (c.parseTime(f.time) != "") {
            g = parseInt(String(f.time).substr(0, 2) + String(f.time).substr(3, 2));
          } else {
            g = 0;
          }
        }
        return (i - g);
      },
      isNullOrUndefined: function(f) {
        return f === null || f === undefined;
      },
      dateIncrement: function(f, h) {
        var i = new Date(f);
        var g = i.getDate();
        if (h == 0) {
          return i;
        }
        if (h < 0) {
          if (Math.abs(h) > g) {
            i.setDate(h + g);
          } else {
            i.setDate(g + h);
          }
        } else {
          i.setDate(h + g);
        }
        return i;
      },
      getDayOfWeekx2: function(f) {
        return d.main.diaryEvents.settings.language.short2DaysInWeek[f.getDay()];
      },
      getDayOfWeekx3: function(f) {
        return d.main.diaryEvents.settings.language.short3DaysInWeek[f.getDay()];
      },
      dig2x: function(f) {
        return (Math.abs(f) < 10) ? "0" + Math.abs(f) : Math.abs(f);
      },
      getWeekNumber: function(i, h) {
        var g, m, l, n;
        h = typeof(h) == "int" ? h : 0;
        l = new Date(i);
        l.setHours(0, 0, 0);
        m = new Date(l.getFullYear(), 0, 1);
        n = m.getDay() - h;
        n = (n >= 0 ? n : n + 7);
        var j = Math.floor((l.getTime() - m.getTime() - (l.getTimezoneOffset() - m.getTimezoneOffset()) * 60000) / 86400000) + 1;
        if (n < 4) {
          g = Math.floor((j + n - 1) / 7) + 1;
          if (g > 52) {
            var k = new Date(l.getFullYear() + 1, 0, 1);
            var f = k.getDay() - h;
            f = f >= 0 ? f : f + 7;
            g = f < 4 ? 1 : 53;
          }
        } else {
          g = Math.floor((j + n - 1) / 7);
        }
        return g;
      }
    };
    if (b[e]) {
      return b[e].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
      if (typeof e === "object" || !e) {
        return b.init.apply(this, arguments);
      } else {
        a.error('Method "' + e + '" does not exist in diaryEvents plugin!');
      }
    }
  };
  a.fn.diaryEvents.defaults = {
    nowdate: new Date(),
    firstday: 1,
    language: lce_lang,
    lcesize: 50,
    returntonow: true,
    returndelay: 4000,
    showScroll: true,
    showMonthYear: true,
    showDayOfWeek: true,
    showNumberOfWeek: true,
    links: new Array(),
    events: new Array(),
  };
  a.fn.diaryEvents.settings = {};
})(jQuery);
