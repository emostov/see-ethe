# frozen_string_literal: true

class AddAddressTypeColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :address_type_tags, :type
    add_column :address_type_tags, :address_type, :string
  end
end
