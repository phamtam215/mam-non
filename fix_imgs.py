import re

path = '/Users/phamtam215/workspace/mam-non/landing.html'
with open(path, 'r', encoding='utf-8') as f:
    html = f.read()

replacements = {
    'photo-1571019613454-1cb2f99b2d8b': 'kid1',
    'photo-1503454537195-1dcabb73ffb9': 'kid2',
    'photo-1544376798-89aa6b0dc069':    'kid3',
    'photo-1509062522246-3755977927d7': 'kid4',
    'photo-1580582932707-520aed937b7b': 'kid5',
    'photo-1541829070764-84a7d30dd3f3': 'kid6',
    'photo-1596464716127-f2a82984de30': 'kid7',
    'photo-1588072432836-e10032774350': 'kid8',
    'photo-1497375638960-5ab7b4265ae0': 'kid9',
    'photo-1545558014-8692077e9b5c':    'kid10',
    'photo-1507003211169-0a1dd7228f2d': 'kid11',
    'photo-1544005313-94ddf0286df2':    'kid12',
    'photo-1472099645785-5658abf4ff4e': 'kid13',
    'photo-1489424731084-a5d8b219a5bb': 'kid14',
}

def replace_url(m):
    photo_id = m.group(1)
    name = replacements.get(photo_id, photo_id)
    return name + '.jpg'

pattern = r'https://images\.unsplash\.com/(photo-[^?]+)\?[^"\'\)]*'
html_new = re.sub(pattern, replace_url, html)

with open(path, 'w', encoding='utf-8') as f:
    f.write(html_new)

remaining = len(re.findall(r'unsplash', html_new))
print(f'Done. Remaining unsplash refs: {remaining}')
