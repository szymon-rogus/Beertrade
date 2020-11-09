from itertools import accumulate

def print_sorted_dict(d):
    print(*sorted(d.items()), sep=' ')

'''
input 
'''

with open("input", encoding="utf-8") as file:
    n = file.readline().split(' ')[0]
    init_prices = file.readline().split(' ')
    init_prices = list(map(float, init_prices))
    buys = file.readline().split(' ')
    buys = list(map(int, buys))

indexed_init_prices = {}
for item in list(enumerate(init_prices)):
    indexed_init_prices[item[0]] = item[1]
print_sorted_dict(indexed_init_prices)

'''
Version 3

TODO:
[] add floor and ceil
+-
I add the weight to the deviation. The more a value is close to the initial value, the bigger is the weight. 
The more far is the value from the initial value, the smaller is the weight. I want to find such coefficients, 
so that the prices never reach i.e. below 0.5 of the initial price or over 2.0 of the initial price

IDEAS:
 - amount of money to distribute should depend on the sum of buys. The more buys - the more dynamic are the prices. 

DESCRIPTION

The idea behind the algorithm is to always add or subtract the same amount of money from all prices. So that after 
every calculation, sum of all prices is the same.

1. I want to increase prices of the most wanted products and decrease prices of the least wanted. That's why I sort 
the products by the amounts, how many of them where bought by the customers. 

2. Then I have some money to distribute (1 unit for every product). I want to add half of it to the 
prices of most wanted and subtract half of it from the least wanted products. 

3. I need to determine which products' prices will be increased and which will be decreased. I count amounts, 
not just products. So I determine how many of the highest products will be half of the amounts. 


4. I need to compare how much the prices where increased so I so
I calculate the compare_number which is the number between biggest from do_decrease and smallest from to_increase

5. I increase and decrease prices by the actual delta. 
'''


class Repr:
    def __init__(self, buys, product_id, sum_pref=None):
        self.buys = buys
        self.product_id = product_id
        self.sum_pref = sum_pref

    # def full_print(self):
    #     return 'Ord(c={}, id={}, sum_pref={}'.format(self.count, self.product_id, self.sum_pref)

    def __str__(self):
        return '({},{},{})'.format(self.product_id, self.buys, self.sum_pref)


def print_reprs(reprs):
    print(list(map(str, reprs)))


# 1
indexed_buys = []
for id, c in enumerate(buys):
    indexed_buys.append(Repr(c, id))

print('\nIndexed buys: (product_id, buys, sum_pref):')
print_reprs(indexed_buys)

sorted_indexed_buys = sorted(indexed_buys, key=lambda a: a.buys)
just_sums = [i.buys for i in sorted_indexed_buys]
prefix_sums = list(accumulate(just_sums))
sorted_indexed_buys_with_sums = list(zip(sorted_indexed_buys, prefix_sums))
sorted_indexed_buys_with_sums = [Repr(a.buys, a.product_id, b) for (a, b) in sorted_indexed_buys_with_sums]

print('\nsorted_indexed_buys_with_prefix_sums:')
print_reprs(sorted_indexed_buys_with_sums)

# 2.1. Then I have some money to distribute (1 unit for every product). I want to add half of it to the
# prices of most wanted and subtract half of it from the least wanted products.

all_buys = sum(buys)
half_buys = all_buys / 2
print(half_buys)
# todo coefficient of this sum
to_distribute = len(buys) * 1


# 3.1. I need to determine which products' prices will be increased and which will be decreased. I count amounts,
# not just products. So I determine how many of the highest products will be half of the amounts.

def find_border_set(sorted_indexed_buys_with_sums_b, x):
    b_set = []
    for i in range(x + 1, len(sorted_indexed_buys_with_sums_b)):
        if sorted_indexed_buys_with_sums_b[i].buys == sorted_indexed_buys_with_sums_b[x].buys:
            b_set.append(sorted_indexed_buys_with_sums_b[i])
        else:
            break
    for i in range(x - 1, -1, -1):
        if sorted_indexed_buys_with_sums_b[i].buys == sorted_indexed_buys_with_sums_b[x].buys:
            b_set.append(sorted_indexed_buys_with_sums_b[i])
        else:
            break
    if len(b_set) != 0:
        b_set.append(sorted_indexed_buys_with_sums_b[x])
    return b_set


to_increase = [x for x in sorted_indexed_buys_with_sums if x.sum_pref >= half_buys]
print_reprs(to_increase)
border_set = []
for x in range (0, len(sorted_indexed_buys_with_sums)):
    if x != len(sorted_indexed_buys_with_sums):
        if sorted_indexed_buys_with_sums[x].sum_pref < half_buys <= sorted_indexed_buys_with_sums[x + 1].sum_pref:
            border_set = find_border_set(sorted_indexed_buys_with_sums, x)
            break

to_increase = set(to_increase) - set(border_set)
to_decrease = (set(sorted_indexed_buys_with_sums) - set(to_increase)) - set(border_set)

is_border_left = 0
is_border_right = 0

if len(to_increase) == 0:
    if len(to_decrease) == 0:
        print(init_prices)
        exit(1)
    else:
        to_increase = border_set
        is_border_right = 1
else:
    if len(to_decrease) == 0:
        to_decrease = border_set
        is_border_left = 1

final_prices = []

# 3.2. Check if half of the buys splits equal values. If yes -> move all of them to to_increase
# todo solution
# 1. create the third set with the same values
# 2. decide where do the values go - to the right or to the left?

# Print sets of the values

print('\nto_decrease:')
print_reprs(to_decrease)
print('\nto_increase:')
print_reprs(to_increase)
print('\nborder_set:')
print_reprs(border_set)


def count_new_prices(to_increase_f, to_decrease_f):
    to_decrease_biggest = sorted([x.buys for x in to_decrease_f])[-1]
    to_increase_smallest = sorted([x.buys for x in to_increase_f])[0]

# 4. I need to compare how much the prices where increased so
# I calculate the compare_number which is the number between biggest from do_decrease and smallest from to_increase

    compare_value = to_decrease_biggest + (to_increase_smallest - to_decrease_biggest) / 2
    print('\ncompare_value = {}'.format(compare_value))

    if to_decrease_f:
        to_decrease_distance = sum([compare_value - x.buys for x in to_decrease_f])
        to_decrease_unit = (to_distribute / 2) / to_decrease_distance
        print('to_decrease_unit = {}'.format(to_decrease_unit))
    else:
        raise Exception("nothing to decrease")

    if to_increase_f:
        to_increase_distance = sum([x.buys - compare_value for x in to_increase_f])
        to_increase_unit = (to_distribute / 2) / to_increase_distance
        print('to_decrease_unit = {}'.format(to_increase_unit))
    else:
        raise Exception("nothing to increase")

# 5. I increase and decrease prices by the actual delta

    new_prices = {}  # product_id -> new_price

    for item in to_decrease_f:
        new_prices[item.product_id] = init_prices[item.product_id] - to_decrease_unit * (compare_value - item.buys)
    for item in to_increase_f:
        new_prices[item.product_id] = init_prices[item.product_id] + to_increase_unit * (item.buys - compare_value)
    return new_prices


if is_border_left or is_border_right:
    final_prices = count_new_prices(to_increase, to_decrease)
    print_sorted_dict(final_prices)
    exit(1)

prices_if_left = count_new_prices(to_increase, set(to_decrease).union(border_set))
prices_if_right = count_new_prices(set(to_increase).union(border_set), to_decrease)

#counting plain
sum_plain = 0
for item in border_set:
    sum_plain = sum_plain + indexed_init_prices[item.product_id]

#counting delta if border left
sum_left = 0
for item in border_set:
    sum_left = sum_left + prices_if_left[item.product_id]

delta_left = abs(sum_plain - sum_left)

#counting delta if border right
sum_right = 0
for item in border_set:
    sum_right = sum_right + prices_if_right[item.product_id]

delta_right = abs(sum_plain - sum_right)

if delta_left >= delta_right:
    print('Chosen right')
    print_sorted_dict(prices_if_right)
else:
    print('Chosen left')
    print_sorted_dict(prices_if_left)




