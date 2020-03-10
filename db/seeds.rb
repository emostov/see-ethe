# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

AddressTypeTag.delete_all
User.delete_all

u1 = User.create(
  email: 'vitalik@ethereum.org',
  username: 'vitalik',
  password: 'password'
)

u2 = User.create(
  email: 'zeke@gmail.com',
  username: 'zeke',
  password: 'password'
)

uTest = User.create(
  email: 'test1@gmail.com',
  username: 'test1',
  password: 'password'
)

ethermine = AddressTypeTag.create!(
  address: '0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8',
  address_type: 'miner',
  name: 'Ethermine'
)

sparkpool = AddressTypeTag.create!(
  address: '0x5A0b54D5dc17e0AadC383d2db43B0a0D3E029c4c',
  address_type: 'miner',
  name: 'Spark Pool'
)

f2pool = AddressTypeTag.create!(
  address: '0x829BD824B016326A401d083B33D092293333A830',
  address_type: 'miner',
  name: 'F2Pool'
)

twominers_solo = AddressTypeTag.create!(
  address: '0x002e08000acbbaE2155Fab7AC01929564949070d',
  address_type: 'miner',
  name: '2Miners: SOLO'
)

myminers_org_Solo = AddressTypeTag.create!(
  address: '0x2A98776C7e13Ed1c240858Bd241DCF95FC1928b4',
  address_type: 'miner',
  name: 'myminers.org: SOLO'
)

nanopool = AddressTypeTag.create!(
  address: '0x52bc44d5378309EE2abF1539BF71dE1b7d7bE3b5',
  address_type: 'miner',
  name: 'Nanopool'
)