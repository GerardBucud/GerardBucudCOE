import math, sys
from shapely.geometry import Polygon, LineString, box, MultiPolygon, Point
from shapely.ops import unary_union
from shapely.geometry.polygon import orient
from shapely import affinity
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen

CAP, XH, ASC, DESC = 700, 520, 730, -200
V, H = 182, 150        # caps stem / bar
v, h = 168, 138        # lowercase stem / bar
N = 2.25               # superellipse exponent (slightly squarish bowls)
SB = 38

def se_pts(cx, cy, rx, ry, n=N, steps=180):
    pts = []
    for i in range(steps):
        t = 2*math.pi*i/steps
        c, s = math.cos(t), math.sin(t)
        x = cx + rx*math.copysign(abs(c)**(2/n), c)
        y = cy + ry*math.copysign(abs(s)**(2/n), s)
        pts.append((x, y))
    return Polygon(pts)

def ring(cx, cy, rx, ry, wv=V, wh=H):
    return se_pts(cx, cy, rx, ry).difference(se_pts(cx, cy, rx-wv, ry-wh))

def wedge(cx, cy, a0, a1, R=3000):
    if a1 < a0: a1 += 360
    pts = [(cx, cy)]
    k = max(2, int((a1-a0)/3))
    for i in range(k+1):
        a = math.radians(a0 + (a1-a0)*i/k)
        pts.append((cx+R*math.cos(a), cy+R*math.sin(a)))
    return Polygon(pts)

def arc(cx, cy, rx, ry, a0, a1, wv=V, wh=H):
    # superellipse param angle != polar angle; use polar wedge from centre
    return ring(cx, cy, rx, ry, wv, wh).intersection(wedge(cx, cy, a0, a1))

def rect(x0, y0, x1, y1): return box(min(x0,x1), min(y0,y1), max(x0,x1), max(y0,y1))

def seg(p1, p2, w, e0=0, e1=0):
    (x1, y1), (x2, y2) = p1, p2
    L = math.hypot(x2-x1, y2-y1); dx, dy = (x2-x1)/L, (y2-y1)/L
    a = (x1-dx*e0, y1-dy*e0); b = (x2+dx*e1, y2+dy*e1)
    return LineString([a, b]).buffer(w/2, cap_style='flat', join_style='mitre')

def poly(pts, w):
    return LineString(pts).buffer(w/2, cap_style='flat', join_style='mitre', mitre_limit=4)

def dbox(x, y, s=150): return rect(x, y, x+s, y+s)

def bowl(x0, y0, x1, y1, rx, wv=V, wh=H, stem=V):
    ry = (y1-y0)/2; cy = (y0+y1)/2; xc = x1-rx
    outer = unary_union([rect(x0, y0, xc, y1), se_pts(xc, cy, rx, ry).intersection(rect(xc, y0-1, x1+1, y1+1))])
    inner = unary_union([rect(x0+stem, y0+wh, xc, y1-wh), se_pts(xc, cy, rx-wv, ry-wh).intersection(rect(xc, y0, x1, y1))])
    return outer.difference(inner)

G = {}
def glyph(ch, clip=None, sb=None):
    def deco(f):
        G[ch] = (f, clip, sb); return f
    return deco

E = 120  # extension for diagonals that get clipped
# ---------------- UPPERCASE ----------------
@glyph('A', clip=(0, CAP))
def _():
    return [seg((70,0),(300,CAP),V+8,E,E), seg((640,0),(410,CAP),V+8,E,E), rect(180,150,530,150+H)]
@glyph('B')
def _():
    return [rect(0,0,V,CAP), bowl(0,CAP-410+H//2-H//2-0,560,CAP,190) if False else bowl(0,296,545,CAP,195), bowl(0,0,590,296+H,215)]
@glyph('C')
def _(): return [arc(345,350,345,357,42,318)]
@glyph('D')
def _(): return [rect(0,0,V,CAP), bowl(0,0,640,CAP,330)]
@glyph('E')
def _(): return [rect(0,0,V,CAP), rect(0,CAP-H,540,CAP), rect(0,290,510,290+H), rect(0,0,560,H)]
@glyph('F')
def _(): return [rect(0,0,V,CAP), rect(0,CAP-H,530,CAP), rect(0,275,490,275+H)]
@glyph('G')
def _(): return [arc(355,350,355,357,38,360), rect(380,232,710,232+H), rect(710-V,0,710,350)] if False else [arc(355,350,355,357,38,360), rect(390,300,710,300+H)]
@glyph('H')
def _(): return [rect(0,0,V,CAP), rect(620-V,0,620,CAP), rect(0,290,620,290+H)]
@glyph('I')
def _(): return [rect(0,0,V,CAP)]
@glyph('J')
def _(): return [rect(540-V,250,540,CAP), arc(270,250,270,255,175,360)]
@glyph('K', clip=(0, CAP))
def _(): return [rect(0,0,V,CAP), seg((120,230),(560,CAP),V+5,0,E), seg((235,385),(590,0),V+15,0,E)]
@glyph('L')
def _(): return [rect(0,0,V,CAP), rect(0,0,520,H)]
@glyph('M', clip=(0, CAP))
def _(): return [rect(0,0,V,CAP), rect(820-V,0,820,CAP), poly([(V/2+10,CAP+150),(410,110),(820-V/2-10,CAP+150)], V)]
@glyph('N', clip=(0, CAP))
def _(): return [rect(0,0,V,CAP), rect(640-V,0,640,CAP), seg((80,CAP),(560,0),V+10,E,E)]
@glyph('O')
def _(): return [ring(370,350,370,357)]
@glyph('P')
def _(): return [rect(0,0,V,CAP), bowl(0,250,590,CAP,235)]
@glyph('Q', clip=(-60, CAP+10))
def _(): return [ring(370,350,370,357), seg((420,220),(700,-40),V-10,0,E)]
@glyph('R', clip=(0, CAP))
def _(): return [rect(0,0,V,CAP), bowl(0,270,590,CAP,225), seg((330,300),(590,0),V+10,0,E)]
@glyph('S')
def _():
    B = 290; up = (CAP+6-B)/2; lo = (B+H+6)/2
    return [arc(310,B+up,295,up,25,270), arc(320,B+H-lo,320,lo,-158,90), rect(260,B,350,B+H)]
@glyph('T')
def _(): return [rect(0,CAP-H,620,CAP), rect(310-V/2,0,310+V/2,CAP)]
@glyph('U')
def _(): return [rect(0,300,V,CAP), rect(640-V,300,640,CAP), arc(320,300,320,305,180,360)]
@glyph('V', clip=(0, CAP))
def _(): return [seg((75,CAP),(300,0),V+8,E,E), seg((605,CAP),(380,0),V+8,E,E)]
@glyph('W', clip=(0, CAP))
def _():
    return [seg((70,CAP),(240,0),V,E,E), seg((470,CAP),(300,0),V,E,E), seg((470,CAP),(640,0),V,E,E), seg((870,CAP),(700,0),V,E,E)]
@glyph('X', clip=(0, CAP))
def _(): return [seg((80,CAP),(580,0),V+15,E,E), seg((580,CAP),(80,0),V+15,E,E)]
@glyph('Y', clip=(0, CAP))
def _(): return [seg((80,CAP),(320,330),V+10,E,20), seg((560,CAP),(320,330),V+10,E,20), rect(320-V/2,0,320+V/2,350)]
@glyph('Z', clip=(0, CAP))
def _(): return [rect(20,CAP-H,580,CAP), rect(0,0,590,H), seg((60,60),(530,CAP-60),V+20,0,0)]

# ---------------- lowercase ----------------
@glyph('a')
def _():
    return [arc(255,340,255,185,0,160,v,h), rect(510-v,0,510,340), ring(240,160,240,168,v,h-8)]
@glyph('b')
def _(): return [rect(0,0,v,ASC), ring(290,260,290,265,v,h).union(rect(0,0,v,XH))]
@glyph('c')
def _(): return [arc(275,260,275,265,45,315,v,h)]
@glyph('d')
def _(): return [rect(580-v,0,580,ASC), ring(290,260,290,265,v,h)]
@glyph('e')
def _(): return [arc(285,260,285,265,0,328,v,h), rect(20,215,565,215+h-5)]
@glyph('f')
def _(): return [rect(50,0,50+v,570), arc(50+215,570,215,160,30,180,v,h), rect(0,XH-h,340,XH)]
@glyph('g', clip=(DESC, XH+10))
def _(): return [rect(580-v,-30,580,XH), ring(290,275,290,250,v,h), arc(290,-30,290,172,200,360,v,h-4)]
@glyph('h')
def _(): return [rect(0,0,v,ASC), rect(560-v,0,560,300), arc(280,300,280,225,0,180,v,h)]
@glyph('i')
def _(): return [rect(0,0,v,XH), rect(0,585,v,ASC)]
@glyph('j', clip=(DESC, ASC), sb=20)
def _(): return [rect(0,-30,v,XH), rect(0,585,v,ASC), arc(v-200,-30,200,172,235,360,v,h-4)]
@glyph('k', clip=(0, ASC))
def _():
    band = box(-500, 0, 2000, XH)
    return [rect(0,0,v,ASC), seg((110,160),(500,XH),v+5,0,E).intersection(band), seg((230,290),(530,0),v+15,0,E).intersection(band)]
@glyph('l')
def _(): return [rect(0,0,v,ASC)]
@glyph('m')
def _():
    return [rect(0,0,v,XH), rect(440-v,0,440,300), rect(880-v,0,880,300), arc(220,300,220,225,0,180,v,h), arc(660,300,220,225,0,180,v,h)]
@glyph('n')
def _(): return [rect(0,0,v,XH), rect(560-v,0,560,300), arc(280,300,280,225,0,180,v,h)]
@glyph('o')
def _(): return [ring(295,260,295,265,v,h)]
@glyph('p')
def _(): return [rect(0,DESC,v,XH), ring(290,260,290,265,v,h)]
@glyph('q')
def _(): return [rect(580-v,DESC,580,XH), ring(290,260,290,265,v,h)]
@glyph('r')
def _(): return [rect(0,0,v,XH), arc(240,300,240,225,62,180,v,h)]
@glyph('s')
def _():
    B, t = 200, h-6
    up = ((XH+5-B)/2); lo = ((B+t+5)/2)
    return [arc(250,B+up,235,up,25,270,v,t), arc(260,B+t-lo,260,lo,-158,90,v,t), rect(220,B,300,B+t)]
@glyph('t')
def _(): return [rect(50,160,50+v,660), arc(50+220,160,220,165,180,295,v,h-4), rect(0,XH-h,330,XH)]
@glyph('u')
def _(): return [rect(0,220,v,XH), rect(560-v,0,560,XH), arc(280,220,280,225,180,360,v,h)]
@glyph('v', clip=(0, XH))
def _(): return [seg((70,XH),(260,0),v+8,E,E), seg((520,XH),(330,0),v+8,E,E)]
@glyph('w', clip=(0, XH))
def _(): return [seg((60,XH),(200,0),v,E,E), seg((390,XH),(250,0),v,E,E), seg((390,XH),(530,0),v,E,E), seg((720,XH),(580,0),v,E,E)]
@glyph('x', clip=(0, XH))
def _(): return [seg((70,XH),(500,0),v+15,E,E), seg((500,XH),(70,0),v+15,E,E)]
@glyph('y', clip=(DESC, XH))
def _(): return [seg((70,XH),(280,40),v+8,E,0), seg((520,XH),(200,DESC),v+8,E,E)]
@glyph('z', clip=(0, XH))
def _(): return [rect(20,XH-h,480,XH), rect(0,0,500,h), seg((60,60),(440,XH-60),v+20)]

# ---------------- digits ----------------
@glyph('0')
def _(): return [ring(300,350,300,357)]
@glyph('1', clip=(0, CAP))
def _(): return [rect(220,0,220+V,CAP), seg((20,500),(300,CAP-40),V-20,0,0)]
@glyph('2', clip=(0, CAP))
def _(): return [arc(290,490,280,210,-38,165,V,H), seg((468,425),(70,70),V+15,0,E), rect(0,0,580,H)]
@glyph('3')
def _(): return [arc(290,497,270,203,-90,160), arc(300,205,300,207,-158,90), rect(160,290,300,290+H)]
@glyph('4', clip=(0, CAP))
def _(): return [rect(390,0,390+V,CAP), seg((470,CAP-50),(50,215),V,0,0), rect(0,160,620,160+H), rect(390,CAP-H,390+V,CAP)]
@glyph('5')
def _(): return [rect(70,CAP-H,560,CAP), rect(60,360,60+V,CAP), arc(300,235,300,240,-155,128)]
@glyph('6')
def _(): return [ring(300,235,300,240), arc(300,350,300,357,40,200)]
@glyph('7', clip=(0, CAP))
def _(): return [rect(0,CAP-H,580,CAP), seg((520,CAP-60),(170,0),V+15,0,E)]
@glyph('8')
def _(): return [ring(300,497,275,207), ring(300,205,300,210)]
@glyph('9')
def _(): return [affinity.rotate(g, 180, origin=(300,350)) for g in [ring(300,235,300,240), arc(300,350,300,357,40,200)]]

# ---------------- punctuation ----------------
@glyph('.')
def _(): return [dbox(0,0)]
@glyph(',', clip=(-160, 200))
def _(): return [rect(20,40,170,150), seg((150,60),(40,-160),110,0,E)]
@glyph(':')
def _(): return [dbox(0,0), dbox(0,370)]
@glyph(';', clip=(-160, 600))
def _(): return [dbox(20,370), rect(20,40,170,150), seg((150,60),(40,-160),110,0,E)]
@glyph('!')
def _(): return [Polygon([(0,CAP),(V+10,CAP),(V-15,230),(25,230)]), dbox(5,0,150)]
@glyph('?')
def _(): return [arc(290,505,270,200,-90,165), rect(220,220,220+V,330), dbox(222,0,148)]
@glyph('"')
def _(): return [Polygon([(0,CAP),(V,CAP),(V-25,450),(25,450)]), Polygon([(200,CAP),(200+V,CAP),(200+V-25,450),(225,450)])]
@glyph("'")
def _(): return [Polygon([(0,CAP),(V,CAP),(V-25,450),(25,450)])]
@glyph('`')
def _(): return [seg((40,760),(200,610),110)]
@glyph('#', clip=(0, CAP))
def _(): return [seg((200,0),(260,CAP),100,E,E), seg((400,0),(460,CAP),100,E,E), rect(20,190,640,290), rect(40,410,660,510)]
@glyph('$', clip=(-90, CAP+90))
def _():
    S = unary_union([g for g in G['S'][0]()])
    return [S, rect(310-45,-90,310+45,CAP+90)]
@glyph('%', clip=(0, CAP))
def _(): return [ring(150,530,150,170,95,85), ring(600,170,150,170,95,85), seg((650,CAP),(100,0),110,E,E)]
@glyph('&', clip=(0, CAP))
def _():
    return [ring(250,545,200,170,V-62,H-48), seg((150,390),(620,0),V-10,0,E), arc(255,205,255,210,90,335), seg((470,140),(650,390),V-10,0,0)]
@glyph('(', clip=(-150, CAP+50))
def _(): return [arc(330,275,330,440,112,248,V,H)]
@glyph(')', clip=(-150, CAP+50))
def _(): return [arc(0,275,330,440,-68,68,V,H)]
@glyph('[')
def _(): return [rect(0,-150,V,CAP+50), rect(0,-150,280,-150+H), rect(0,CAP+50-H,280,CAP+50)]
@glyph(']')
def _(): return [rect(280-V,-150,280,CAP+50), rect(0,-150,280,-150+H), rect(0,CAP+50-H,280,CAP+50)]
@glyph('{')
def _(): return [poly([(330,CAP+50-60),(170,CAP+50-60),(170,330),(40,275),(170,220),(170,-150+60),(330,-150+60)], 120)]
@glyph('}')
def _(): return [affinity.scale(unary_union(G['{'][0]()), -1, 1, origin=(185,0))]
@glyph('*')
def _():
    c = (230, 520)
    return [seg((c[0]+130*math.cos(math.radians(a)), c[1]+130*math.sin(math.radians(a))),
                (c[0]-130*math.cos(math.radians(a)), c[1]-130*math.sin(math.radians(a))), 95) for a in (90, 30, 150)]
@glyph('+')
def _(): return [rect(0,280,520,280+H), rect(260-V/2,90,260+V/2,600)]
@glyph('-')
def _(): return [rect(0,250,320,250+H)]
@glyph('=')
def _(): return [rect(0,170,520,170+H-10), rect(0,400,520,400+H-10)]
@glyph('_')
def _(): return [rect(0,-180,560,-180+H-10)]
@glyph('/', clip=(-60, CAP+40))
def _(): return [seg((60,-60),(400,CAP+40),V-10,E,E)]
@glyph('\\', clip=(-60, CAP+40))
def _(): return [seg((400,-60),(60,CAP+40),V-10,E,E)]
@glyph('|')
def _(): return [rect(0,-200,V-20,CAP+60)]
@glyph('<')
def _(): return [poly([(500,600),(80,345),(500,90)], H+10)]
@glyph('>')
def _(): return [poly([(0,600),(420,345),(0,90)], H+10)]
@glyph('^', clip=(330, CAP))
def _(): return [poly([(30,300),(270,CAP-60),(510,300)], H+10)]
@glyph('~')
def _():
    pts = [(x, 330 + 70*math.sin((x/520)*2*math.pi)) for x in range(0, 521, 10)]
    return [LineString(pts).buffer(55, cap_style='flat', join_style='round')]
@glyph('@', clip=(-120, CAP+40))
def _():
    cx, cy, w = 450, 300, 105
    return [ring(cx-40, 300, 160, 170, w, w), rect(cx+50, 300, cx+155, 470),
            arc(cx, cy, 420, 420, 0, 315, w, w), arc(cx+(50+420)/2, cy, (420-50)/2, 150, 180, 360, w, w)]


# ---------------- v2 overrides: horizontal terminals ----------------
def hcut(cx, cy, rx, ry, ytop, ybot, wv=V, wh=H, side='r'):
    r = ring(cx, cy, rx, ry, wv, wh)
    x0, x1 = (cx, cx+rx+10) if side == 'r' else (cx-rx-10, cx)
    return r.difference(rect(x0, ybot, x1, ytop))
@glyph('C')
def _(): return [hcut(345,350,345,357,470,230)]
@glyph('G')
def _(): return [hcut(355,350,355,357,470,330), rect(380,280,710,280+H-10), rect(710-V,0,710,330)]
@glyph('c')
def _(): return [hcut(275,260,275,265,355,165,v,h)]
@glyph('e')
def _(): return [hcut(285,260,285,265,205,130,v,h), rect(20,205,565,205+h-8)]
@glyph('S')
def _():
    B = 285; up = (CAP+6-B)/2; lo = (B+H+6)/2
    U = hcut(310,B+up,300,up,B+up-15,-100)
    L = hcut(320,B+H-lo,325,lo,900,B+H-lo+20,side='l')
    return [U, L, rect(260,B,350,B+H)]
@glyph('s')
def _():
    B, t = 195, h-4
    up = (XH+5-B)/2; lo = (B+t+5)/2
    U = hcut(250,B+up,240,up,B+up-5,-100,v,t)
    L = hcut(262,B+t-lo,262,lo,900,B+t-lo+15,v,t,side='l')
    return [U, L, rect(220,B,300,B+t)]
@glyph('$', clip=(-90, CAP+90))
def _():
    return [unary_union(G['S'][0]()), rect(310-45,-90,310+45,CAP+90)]
# ---------------- build ----------------
def build_glyph(ch):
    f, clip, sb = G[ch]
    geom = unary_union([g.buffer(1.5, join_style='mitre') for g in f() if not g.is_empty]).buffer(-1.5, join_style='mitre')
    if clip:
        geom = geom.intersection(box(-2000, clip[0], 4000, clip[1]))
    R = 14
    geom = geom.buffer(-R, join_style='round').buffer(R, join_style='round')   # soften corners
    geom = geom.simplify(0.6)
    if geom.is_empty: return None, 300
    minx, _, maxx, _ = geom.bounds
    s = SB if sb is None else sb
    geom = affinity.translate(geom, s - minx, 0)
    adv = int(round(maxx - minx + 2*s))
    return geom, adv

def draw(geom):
    pen = TTGlyphPen(None)
    if geom is not None:
        polys = geom.geoms if isinstance(geom, MultiPolygon) else [geom] if isinstance(geom, Polygon) else [g for g in geom.geoms if isinstance(g, Polygon)]
        for p in polys:
            p = orient(p, sign=-1.0)
            for ringc in [p.exterior] + list(p.interiors):
                pts = [(int(round(x)), int(round(y))) for x, y in list(ringc.coords)[:-1]]
                dedup = [pt for i, pt in enumerate(pts) if pt != pts[i-1]]
                if len(dedup) < 3: continue
                pen.moveTo(dedup[0])
                for pt in dedup[1:]: pen.lineTo(pt)
                pen.closePath()
    return pen.glyph()

def gname(ch):
    from fontTools.agl import UV2AGL
    return UV2AGL.get(ord(ch), 'uni%04X' % ord(ch))

chars = [c for c in G if len(c) == 1]
order = ['.notdef', 'space'] + [gname(c) for c in chars]
glyphs, metrics, cmap = {}, {}, {32: 'space'}
nd = TTGlyphPen(None)
for pts in ([(50,0),(50,700),(450,700),(450,0)], [(110,60),(390,60),(390,640),(110,640)]):
    nd.moveTo(pts[0]); [nd.lineTo(p) for p in pts[1:]]; nd.closePath()
glyphs['.notdef'] = nd.glyph(); metrics['.notdef'] = (500, 50)
glyphs['space'] = TTGlyphPen(None).glyph(); metrics['space'] = (260, 0)
for c in chars:
    geom, adv = build_glyph(c)
    n = gname(c)
    glyphs[n] = draw(geom)
    metrics[n] = (adv, SB)
    cmap[ord(c)] = n

fb = FontBuilder(1000, isTTF=True)
fb.setupGlyphOrder(order)
fb.setupCharacterMap(cmap)
fb.setupGlyf(glyphs)
for n, g in glyphs.items():
    g.recalcBounds(fb.font['glyf'])
    metrics[n] = (metrics[n][0], getattr(g, 'xMin', 0) or 0)
fb.setupHorizontalMetrics(metrics)
fb.setupHorizontalHeader(ascent=900, descent=-250)
fam = 'Brawny Sans V2'
fb.setupNameTable({'familyName': fam, 'styleName': 'Black', 'uniqueFontIdentifier': 'BrawnySansV2-Black-1.0',
                   'fullName': fam + ' Black', 'psName': 'BrawnySansV2-Black', 'version': 'Version 1.000',
                   'copyright': 'Original design generated 2026. Free to use.'})
fb.setupOS2(sTypoAscender=730, sTypoDescender=-250, sTypoLineGap=100, usWinAscent=900, usWinDescent=250,
            sxHeight=XH, sCapHeight=CAP, usWeightClass=900, achVendID='NONE', fsSelection=0x40)
fb.setupPost()
fb.setupHead(unitsPerEm=1000)
out = sys.argv[1]
import time
from fontTools.misc.timeTools import timestampFromString, timestampNow
fb.font['head'].created = fb.font['head'].modified = timestampNow()
fb.save(out)
print('saved', out, len(order), 'glyphs')
