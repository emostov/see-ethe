# == Schema Information
#
# Table name: address_type_tags
#
#  id         :bigint           not null, primary key
#  address    :string           not null
#  type       :string           not null
#  name       :string
#  data       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class AddressTypeTag < ApplicationRecord
end
